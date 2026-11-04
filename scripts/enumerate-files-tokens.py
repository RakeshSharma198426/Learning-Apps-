#!/usr/bin/env python3
"""
enumerate-files-tokens.py
--------------------------
Walk a codebase directory and produce a JSON inventory of every source file
together with its approximate GPT-4o token count (via tiktoken).

Usage:
    python scripts/enumerate-files-tokens.py [root_dir] [--output path/to/out.json]

Defaults:
    root_dir  = current working directory
    --output  = .planning/codebase/file-inventory.json

Output JSON schema:
    {
      "root": "/abs/path",
      "generated": "ISO-8601 timestamp",
      "total_files": N,
      "total_tokens": N,
      "files": [
        {
          "path": "relative/path/to/File.java",
          "ext": ".java",
          "size_bytes": 12345,
          "tokens": 3210
        },
        ...
      ]
    }

Files are sorted by token count descending (most complex first).
Binary files, build artefacts, and vendor dirs are excluded.
"""

import argparse
import json
import os
import sys
from datetime import datetime, timezone

# ---------------------------------------------------------------------------
# Tiktoken import — graceful fallback if not installed
# ---------------------------------------------------------------------------
try:
    import tiktoken
    _ENCODING = tiktoken.get_encoding("o200k_base")   # GPT-4o encoding

    def count_tokens(text: str) -> int:
        return len(_ENCODING.encode(text, disallowed_special=()))

except ImportError:
    print(
        "[WARNING] tiktoken is not installed. "
        "Falling back to whitespace-split word count × 0.75 approximation.\n"
        "Install with: pip install tiktoken",
        file=sys.stderr,
    )

    def count_tokens(text: str) -> int:          # type: ignore[misc]
        return max(1, int(len(text.split()) * 0.75))


# ---------------------------------------------------------------------------
# Inclusion / exclusion rules
# ---------------------------------------------------------------------------
INCLUDE_EXTENSIONS = {
    # Java / JVM
    ".java", ".kt", ".groovy", ".scala",
    # Config / descriptors
    ".xml", ".yaml", ".yml", ".properties", ".json", ".toml", ".ini", ".cfg",
    # SQL / migrations
    ".sql", ".hql",
    # Web
    ".html", ".jsp", ".jspx", ".css", ".js", ".ts", ".tsx",
    # Docs
    ".md", ".rst", ".txt",
    # Shell
    ".sh", ".bat", ".ps1",
}

EXCLUDE_DIR_NAMES = {
    ".git", ".svn", ".hg",
    "target", "build", "out", "dist", "bin",
    "node_modules", ".node_modules",
    "__pycache__", ".pytest_cache",
    ".planning",          # skip already-generated planning docs
    ".zerovity",
    ".idea", ".vscode", ".settings",
    "snapshots",          # liquibase binary snapshots
}

EXCLUDE_FILE_PATTERNS = {
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
}

MAX_FILE_BYTES = 2 * 1024 * 1024  # skip files > 2 MB


# ---------------------------------------------------------------------------
# Core walk
# ---------------------------------------------------------------------------
def should_exclude_dir(dirpath: str, dirnames: list) -> None:
    """Prune `dirnames` in-place to skip excluded dirs."""
    dirnames[:] = [
        d for d in dirnames
        if d not in EXCLUDE_DIR_NAMES and not d.startswith(".")
    ]


def enumerate_files(root: str) -> list[dict]:
    results: list[dict] = []
    root_abs = os.path.abspath(root)

    for dirpath, dirnames, filenames in os.walk(root_abs):
        should_exclude_dir(dirpath, dirnames)

        for fname in filenames:
            _, ext = os.path.splitext(fname)
            if ext.lower() not in INCLUDE_EXTENSIONS:
                continue
            if fname in EXCLUDE_FILE_PATTERNS:
                continue

            full_path = os.path.join(dirpath, fname)
            try:
                size = os.path.getsize(full_path)
            except OSError:
                continue

            if size > MAX_FILE_BYTES:
                continue

            try:
                with open(full_path, "r", encoding="utf-8", errors="replace") as fh:
                    text = fh.read()
            except OSError:
                continue

            tokens = count_tokens(text)
            rel_path = os.path.relpath(full_path, root_abs).replace("\\", "/")

            results.append(
                {
                    "path": rel_path,
                    "ext": ext.lower(),
                    "size_bytes": size,
                    "tokens": tokens,
                }
            )

    results.sort(key=lambda r: r["tokens"], reverse=True)
    return results


# ---------------------------------------------------------------------------
# Grouping helpers (useful for agents choosing what to read)
# ---------------------------------------------------------------------------
def build_summary(root: str, files: list[dict]) -> dict:
    by_ext: dict[str, dict] = {}
    for f in files:
        ext = f["ext"]
        if ext not in by_ext:
            by_ext[ext] = {"count": 0, "tokens": 0}
        by_ext[ext]["count"] += 1
        by_ext[ext]["tokens"] += f["tokens"]

    # Sort by total token weight
    ext_summary = sorted(
        [{"ext": k, **v} for k, v in by_ext.items()],
        key=lambda x: x["tokens"],
        reverse=True,
    )

    # Top-20 largest files
    top_files = [
        {"path": f["path"], "tokens": f["tokens"], "size_bytes": f["size_bytes"]}
        for f in files[:20]
    ]

    return {
        "root": root,
        "generated": datetime.now(timezone.utc).isoformat(),
        "total_files": len(files),
        "total_tokens": sum(f["tokens"] for f in files),
        "by_extension": ext_summary,
        "top_20_by_tokens": top_files,
        "files": files,
    }


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------
def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "root",
        nargs="?",
        default=".",
        help="Root directory to scan (default: current directory)",
    )
    parser.add_argument(
        "--output",
        default=".planning/codebase/file-inventory.json",
        help="Output JSON file path (default: .planning/codebase/file-inventory.json)",
    )
    parser.add_argument(
        "--top",
        type=int,
        default=0,
        help="If >0, print top-N files to stdout after writing JSON",
    )
    args = parser.parse_args()

    root = os.path.abspath(args.root)
    if not os.path.isdir(root):
        print(f"[ERROR] Directory not found: {root}", file=sys.stderr)
        sys.exit(1)

    print(f"[enumerate-files-tokens] Scanning: {root}", file=sys.stderr)
    files = enumerate_files(root)

    summary = build_summary(root, files)

    # Ensure output directory exists
    out_dir = os.path.dirname(os.path.abspath(args.output))
    os.makedirs(out_dir, exist_ok=True)

    with open(args.output, "w", encoding="utf-8") as fh:
        json.dump(summary, fh, indent=2)

    print(
        f"[enumerate-files-tokens] Done: {summary['total_files']} files, "
        f"{summary['total_tokens']:,} tokens → {args.output}",
        file=sys.stderr,
    )

    if args.top > 0:
        print(f"\nTop {args.top} files by token count:")
        for f in files[: args.top]:
            print(f"  {f['tokens']:>8,}  {f['path']}")


if __name__ == "__main__":
    main()
