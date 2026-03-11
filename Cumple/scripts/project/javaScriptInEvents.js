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


// ZzFX - Zuper Zmall Zound Zynth - Micro Edition
// MIT License - Copyright 2019 Frank Force
// https://github.com/KilledByAPixel/ZzFX

// This is a tiny build of zzfx with only a zzfx function to play sounds.
// You can use zzfxV to set volume.
// Feel free to minify it further for your own needs!

'use strict';let zzfx,zzfxV,zzfxX

// ZzFXMicro - Zuper Zmall Zound Zynth - v1.2.3 by Frank Force ~ 887 bytes
zzfxV=.3    // volume
zzfx=       // play sound
(p=1,k=.05,b=220,e=0,r=0,t=.1,q=0,D=1,u=0,y=0,v=0,z=0,l=0,E=0,A=0,F=0,c=0,w=1,m=
0,B=0)=>{let M=Math,R=44100,d=2*M.PI,G=u*=500*d/R/R,C=b*=(1-k+2*k*M.random(k=[]))
*d/R,g=0,H=0,a=0,n=1,I=0,J=0,f=0,x,h;e=R*e+9;m*=R;r*=R;t*=R;c*=R;y*=500*d/R**3;
A*=d/R;v*=d/R;z*=R;l=R*l|0;for(h=e+m+r+t+c|0;a<h;k[a++]=f)++J%(100*F|0)||(f=q?1<q
?2<q?3<q?M.sin((g%d)**3):M.max(M.min(M.tan(g),1),-1):1-(2*g/d%2+2)%2:1-4*M.abs(M.
round(g/d)-g/d):M.sin(g),f=(l?1-B+B*M.sin(d*a/l):1)*(0<f?1:-1)*M.abs(f)**D*zzfxV
*p*(a<e?a/e:a<e+m?1-(a-e)/m*(1-w):a<e+m+r?w:a<h-c?(h-a-c)/t*w:0),f=c?f/2+(c>a?0:
(a<h-c?1:(h-a)/c)*k[a-c|0]/2):f),x=(b+=u+=y)*M.cos(A*H++),g+=x-x*E*(1-1E9*(M.sin
(a)+1)%2),n&&++n>z&&(b+=v,C+=v,n=0),!l||++I%l||(b=C,u=G,n=n||1);p=zzfxX.
createBuffer(1,h,R);p.getChannelData(0).set(k);b=zzfxX.createBufferSource();b.
buffer=p;b.connect(zzfxX.destination);b.connect(reverb);b.start();return b};zzfxX=new AudioContext;

// --- Reverb setup ---
const reverb = zzfxX.createConvolver();
const reverbGain = zzfxX.createGain();
reverbGain.gain.value = 0.33; // reverb amount (0–1)

// Simple generated impulse response
function createImpulse(seconds = 2, decay = 2) {
  const rate = zzfxX.sampleRate;
  const length = rate * seconds;
  const impulse = zzfxX.createBuffer(2, length, rate);

  for (let c = 0; c < 2; c++) {
    const data = impulse.getChannelData(c);
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    }
  }
  return impulse;
}

reverb.buffer = createImpulse(2, 3);

// Wire reverb → speakers
reverb.connect(reverbGain);
reverbGain.connect(zzfxX.destination);

const scriptsInEvents = {

	async _main_Event72_Act1(runtime, localVars)
	{
		const paramArray = localVars.SFX.split(',').map(value => value === '' ? undefined : parseFloat(value));
		
		const updateParam = (index, value) => {
		  if (paramArray[index] !== undefined || value !== 0) {
		    paramArray[index] = (paramArray[index] || 0) + value;
		  }
		};
		
		updateParam(14, localVars.modulation);
		updateParam(15, localVars.bitcrush);
		updateParam(16, localVars.delay);
		updateParam(0, localVars.volume);
		updateParam(1, localVars.randomness);
		updateParam(2, localVars.frequency);
		updateParam(5, localVars.decay);
		
		//console.log(paramArray.toString());
		
		zzfx(...paramArray);
	},

	async _global_Event6_Act1(runtime, localVars)
	{
		localVars.S = encodeURIComponent(localVars.S);
	},

	async _global_Event21_Act2(runtime, localVars)
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

localVars.visibleText = visibleText;
	},

	async _global_Event23_Act2(runtime, localVars)
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

	async _global_Event56_Act2(runtime, localVars)
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

	async _global_Event57_Act2(runtime, localVars)
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

	async _global_Event66_Act2(runtime, localVars)
	{
		const {text, tag, index} = localVars;
		const result = matchBBCode(text, tag, index);
		runtime.setReturnValue(result.content);
	},

	async _global_Event67_Act2(runtime, localVars)
	{
		const {text, tag, index, part} = localVars;
		const result = splitBBCode(text, tag, index, part);
		runtime.setReturnValue(result);
	},

	async _global_Event68_Act2(runtime, localVars)
	{
		const {text, tag} = localVars;
		const result = tokenCountBBCode(text, tag);
		runtime.setReturnValue(result);
	},

	async _global_Event69_Act2(runtime, localVars)
	{
		const {text, tag, rep, index} = localVars;
		const result = replaceBBCode(text, tag, rep, index);
		runtime.setReturnValue(result);
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
