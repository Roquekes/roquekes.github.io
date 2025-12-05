

const scriptsInEvents = {

	async _global_Event20_Act2(runtime, localVars)
	{
const { text, typewriteProgress } = localVars;

// Count visible characters (ignoring BBCode)
const visibleText = text.replace(/\[[^\]]+\]/g, "");
const limit = typewriteProgress * visibleText.length;
const cursorIndex = Math.floor(limit);

let charCount = 0;

const content = text.replace(/\[[^\]]+\]|[\s\S]/g, (token) => {
    if (token.startsWith("[")) return token;
    let output = token;
    if (charCount === cursorIndex) {
        const progress = (limit - charCount);
        output = `[offsetY=${(1-progress.toFixed(2))*localVars.typeWritterOffsetEffect}][opacity=${progress.toFixed(1)*100}]${token}[/opacity][/offsetY]`;
    } else if (charCount === cursorIndex + 1) {
        output = "[hide]" + token;
    }
    charCount++;
    return output;
});

localVars.text = content + (cursorIndex < visibleText.length - 1 ? "[/hide]" : "");
	},

	async _global_Event21_Act2(runtime, localVars)
	{
const { text, typewriteProgress, faceSize } = localVars;

// Count visible characters (ignoring BBCode)
const visibleText = text.replace(/\[[^\]]+\]/g, "");
const limit = typewriteProgress * visibleText.length;
const cursorIndex = Math.floor(limit);

let charCount = 0;
let stopped = false;

const content = text.replace(/\[[^\]]+\]|[\s\S]/g, (token) => {
    if (stopped) return "";
    if (token.startsWith("[")) return token;

    let output = token;

    if (charCount === cursorIndex) {
        const size = (limit - charCount) * faceSize;
        output = `[size=${size.toFixed(2)}]${token}[/size]`;
        charCount++;

        stopped = true;
        return output;
    }

    charCount++;
    return output;
});

localVars.text = content;
	},

	async _global_Event54_Act2(runtime, localVars)
	{
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

const {text, tag, value} = localVars;
const result = addBBCodeTag(text, tag, value);
runtime.setReturnValue(result);
	},

	async _global_Event55_Act2(runtime, localVars)
	{
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

const {text, tag, index} = localVars;
const result = matchBBCode(text, tag, index);
runtime.setReturnValue(result.content);
	},

	async _global_Event64_Act2(runtime, localVars)
	{
		const {text, tag, index} = localVars;
		const result = matchBBCode(text, tag, index);
		runtime.setReturnValue(result.content);
	},

	async _global_Event65_Act2(runtime, localVars)
	{
		const {text, tag, index, part} = localVars;
		const result = splitBBCode(text, tag, index, part);
		runtime.setReturnValue(result);
	},

	async _global_Event66_Act2(runtime, localVars)
	{
		const {text, tag} = localVars;
		const result = tokenCountBBCode(text, tag);
		runtime.setReturnValue(result);
	},

	async _global_Event67_Act2(runtime, localVars)
	{
		const {text, tag, rep, index} = localVars;
		const result = replaceBBCode(text, tag, rep, index);
		runtime.setReturnValue(result);
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
