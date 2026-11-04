// Can add various constants or common functions.
export function addEllipsis(text, maxLength = 14) {
    if (!text || typeof text !== 'string' || maxLength <= 0) return '';
    return text.length > maxLength
      ? text.slice(0, maxLength).trimEnd() + '...'
      : text;
  }
  