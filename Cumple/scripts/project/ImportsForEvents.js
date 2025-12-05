/**
 * Matches all occurrences of a specified BBCode tag in the text and returns an array of match results.
 *
 * @param {string} text - The input text to search within.
 * @param {string} tagName - The BBCode tag name to match.
 * @returns {Array} Array of match result objects, each containing tagName, param, and content.
 */
function matchAllBBCode(text, tagName) {
  const regex = new RegExp(`\\[${tagName}(?:=([^\\]]+))?\\]([\\s\\S]*?)\\[\\/${tagName}\\]`, 'g');
  return [...text.matchAll(regex)].map(match => ({
    tagName,
    param: match[1] || null,
    content: match[2],
  }));
}


/**
 * Matches the BBCode tag at the specified index in the text and returns the match result.
 *
 * @param {string} text - The input text to search within.
 * @param {string} tagName - The BBCode tag name to match.
 * @param {number} index - Zero-based index of the tag occurrence to retrieve.
 * @returns {Object|null} Match result object or null if not found.
 */
function matchBBCode(text, tagName, index) {
  return matchAllBBCode(text, tagName)[index] || null;
}


/**
 * Replaces specified BBCode tags in the text with new content, supporting references to matched groups.
 *
 * @param {string} text - The original text to search within.
 * @param {string} tagName - The BBCode tag name to match.
 * @param {string} replacement - Content to replace the matched tag with;  supports `$0` for the full match, `$1` for the parameter, and `$2` for the content.
 * @param {number} index - Occurrence index of the tag to replace;  `0` replaces all, `1` for the first, and so on.
 * @returns {string} Text with the specified BBCode tags replaced.
 */
function replaceBBCode(text, tagName, replacement, index) {
  const regex = new RegExp(`\\[${tagName}(?:=([^\\]]+))?\\]([\\s\\S]*?)\\[\\/${tagName}\\]`, 'g');
  let matchCount = 0;
  return text.replace(regex, (match, p1, p2) => {
    matchCount++;
    return (index === 0 || matchCount === index)
      ? replacement
	  .replace(/\$0/g, match)
	  .replace(/\$1/g, p1 || '')
	  .replace(/\$2/g, p2)
      : match;
  });
}


/**
 * Splits the text based on the specified BBCode tag and retrieves parts according to the tagIndex and partIndex.
 *
 * @param {string} text - The original text to split.
 * @param {string} tagName - The BBCode tag name to match.
 * @param {number} tagIndex - Specifies which tag occurrence to split by. `0` for all matches, `1` for the first tag only.
 * @param {number} partIndex - The part to return: 0 for the text before the tag, 1 for the tag itself, and 2 for the text after the tag.
 * @returns {string|null} The extracted part or null if not found.
 */
function splitBBCode(text, tagName, tagIndex, partIndex) {
  const regex = new RegExp(`(\\[${tagName}(?:=[^\\]]+)?\\][\\s\\S]*?\\[\\/${tagName}\\])`, 'g');
  const parts = text.split(regex).map(part => part.trim());

  if (tagIndex === 0) {
    return parts[partIndex] || null;
  }

  if (tagIndex === 1) {
    if (partIndex === 0) return parts[0];
    if (partIndex === 1) return parts[1];
    if (partIndex === 2) return parts.slice(2).join(' ');
  }
  return null;
}


/**
 * Counts the occurrences of a specified BBCode tag in the text.
 *
 * @param {string} text - The original text to search within.
 * @param {string} tagName - The BBCode tag name to count.
 * @param {number} tagIndex - returns the match count;
 * @returns {number} The count based on tagIndex.
 */
function tokenCountBBCode(text, tagName) {
  const regex = new RegExp(`\\[${tagName}(?:=[^\\]]+)?\\][\\s\\S]*?\\[\\/${tagName}\\]`, 'g');
  const matches = [...text.matchAll(regex)];
  return matches.length;
}

/**
 * Wraps the given text with a specified BBCode tag.
 *
 * @param {string} text - The text to be wrapped (the content of the tag).
 * @param {string} tagName - The name of the BBCode tag.
 * @param {string} [param] - Optional parameter for the tag (e.g., a URL or color).
 * @returns {string} The text wrapped in the specified BBCode tag.
 */
function addBBCodeTag(text, tagName, param) {
  const openTag = param ? `[${tagName}=${param}]` : `[${tagName}]`;
  const closeTag = `[/${tagName}]`;
  return `${openTag}${text}${closeTag}`;
}