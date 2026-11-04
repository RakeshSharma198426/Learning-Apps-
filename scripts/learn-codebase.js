#!/usr/bin/env node
// zerovity-launcher (managed): forwards to .zerovity/scripts/learn-codebase.js. Works in CommonJS and ESM projects.
import('node:child_process').then(async ({ spawnSync }) => {
  const path = await import('node:path');
  const target = path.resolve(path.dirname(process.argv[1]), '..', '.zerovity', 'scripts', "learn-codebase.js");
  const r = spawnSync(process.execPath, [target, ...process.argv.slice(2)], { stdio: 'inherit' });
  process.exit(r.status === null ? 1 : r.status);
});
