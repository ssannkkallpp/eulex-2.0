export function cleanWord(word: string): string {
    return word.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
}

// Save the original for testing
export const getSyllablesOriginal = getSyllables;

// Improved getSyllables function
export function getSyllables(word: string): string {
    if (!word || word.length < 2) return word;
    word = word.toLowerCase();

    // Dictionary of common exceptions (add more as needed)
    const exceptions: { [key: string]: string } = {
        'lived': 'lived',
        'baked': 'baked',
        'apple': 'ap-ple',
        'bottle': 'bot-tle',
        'little': 'lit-tle',
        'table': 'ta-ble',
        'people': 'peo-ple',
        'queue': 'queue',
        'science': 'sci-ence',
        'quiet': 'qui-et',
        'lion': 'li-on',
        'fire': 'fire',
        'hour': 'hour',
        'our': 'our',
        'beautiful': 'beau-ti-ful',
        'education': 'ed-u-ca-tion',
        'nation': 'na-tion',
        'station': 'sta-tion',
        'motion': 'mo-tion',
        'action': 'ac-tion',
        'question': 'ques-tion',
        'business': 'busi-ness',
        'syllable': 'syl-la-ble',
        'rhythm': 'rhythm',
        'family': 'fam-i-ly',
        'camera': 'cam-er-a',
        'every': 'ev-ery',
        'chocolate': 'choc-o-late',
        'interesting': 'in-ter-est-ing',
        'different': 'dif-fer-ent',
        'separate': 'sep-a-rate',
        'favorite': 'fa-vor-ite',
        'temperature': 'tem-per-a-ture',
        'vegetable': 'veg-e-ta-ble',
        'comfortable': 'com-fort-a-ble',
        'animal': 'an-i-mal',
        'banana': 'ba-na-na',
        'elephant': 'el-e-phant',
        'computer': 'com-pu-ter',
        'umbrella': 'um-brel-la',
        'remember': 're-mem-ber',
        'together': 'to-geth-er',
        'tomorrow': 'to-mor-row',
        'yesterday': 'yes-ter-day',
        'holiday': 'hol-i-day',
        'library': 'li-brar-y',
        'memory': 'mem-o-ry',
        'history': 'his-to-ry',
        'factory': 'fac-to-ry',
        'category': 'cat-e-go-ry',
        'directory': 'di-rec-to-ry',
        'necessary': 'nec-es-sar-y',
        'ordinary': 'or-di-nar-y',
        'primary': 'pri-ma-ry',
        'secondary': 'sec-on-da-ry',
        'dictionary': 'dic-tion-ar-y',
        'stationary': 'sta-tion-ar-y',
        'temporary': 'tem-po-rar-y',
        'voluntary': 'vol-un-tar-y',
        'contrary': 'con-trar-y',
        'military': 'mil-i-tar-y',
        'secretary': 'sec-re-tar-y',
        'salary': 'sal-a-ry',
    };
    if (exceptions[word]) return exceptions[word];

    // Handle common suffixes
    const suffixes = ['ed', 'ing', 'tion', 'sion', 'ment', 'ness', 'ful', 'less', 'able', 'ible', 'al', 'ous', 'ly', 'er', 'est', 'ize', 'ise', 'en', 'ish', 'ward', 'wise'];
    for (const suffix of suffixes) {
        if (word.endsWith(suffix) && word.length > suffix.length + 1) {
            const base = word.slice(0, -suffix.length);
            return getSyllables(base) + '-' + suffix;
        }
    }

    // Handle silent 'e' at the end
    if (word.endsWith('e') && word.length > 2 && !['le', 'ee', 'oe', 'ye'].some(s => word.endsWith(s))) {
        return getSyllables(word.slice(0, -1));
    }

    // Handle consonant + le endings
    if (word.length > 2 && word.endsWith('le') && !['a','e','i','o','u','y'].includes(word[word.length - 3])) {
        return getSyllables(word.slice(0, -2)) + '-le';
    }

    // Vowel digraphs/diphthongs
    const vowelDigraphs = ['ea', 'oa', 'ie', 'ou', 'ai', 'ee', 'oo', 'ue', 'ei', 'au', 'oi', 'oy', 'ow', 'ew'];
    let letters = word.split('');
    let vMask = new Array(letters.length).fill(0);
    for (let i = 0; i < letters.length; i++) {
        if (i < letters.length - 1 && vowelDigraphs.includes(letters[i] + letters[i + 1])) {
            vMask[i] = 1;
            vMask[i + 1] = -1; // Mark as part of digraph
            i++;
        } else if ('aeiouy'.includes(letters[i])) {
            vMask[i] = 1;
        }
    }

    // Apply improved splitting rules (same as before, but skip -1s)
    let pV = -1;
    for (let i = 0; i < vMask.length; i++) {
        if (vMask[i] === 1) {
            if (pV !== -1 && i - pV > 1) {
                const consonantCount = i - pV - 1;
                if (consonantCount === 1) {
                    vMask[i - 1] = 2;
                } else if (consonantCount === 2) {
                    const pair = letters.slice(i - 2, i).join('');
                    if ([
                        'sh', 'wh', 'th', 'ch', 'cr', 'ss', 'ck', 'di', 'lk', 'bl', 'br', 'cl', 'cr', 'dr', 'fl', 'fr', 'gl', 'gr', 'pl', 'pr', 'sc', 'sk', 'sl', 'sm', 'sn', 'sp', 'st', 'sw', 'tr', 'tw'
                    ].includes(pair)) {
                        vMask[i - 2] = 2;
                    } else {
                        vMask[i - 1] = 2;
                    }
                } else if (consonantCount >= 3) {
                    const triple = letters.slice(i - 3, i).join('');
                    if ([
                        'rkn', 'thn', 'thw', 'chn', 'shn', 'rdm', 'lkm', 'str', 'spr', 'scr'
                    ].includes(triple)) {
                        vMask[i - 1] = 2;
                    } else if ([
                        'tch', 'dge', 'phth'
                    ].some(pattern => triple.includes(pattern))) {
                        vMask[i - 3] = 2;
                    } else {
                        vMask[i - 2] = 2;
                    }
                }
            }
            pV = i;
        }
    }

    // Build syllable string
    let result = '';
    for (let i = 0; i < letters.length; i++) {
        if (vMask[i] === 2 && i !== 0) {
            result += '-';
        }
        if (vMask[i] !== -1) {
            result += letters[i];
        }
    }
    return result;
}

export function parseContent(content: string): {
    words: string[];
    sentences: string[];
    wordSentenceMap: number[];
} {
    // Split into sentences first
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    // Split into words
    const words = content.split(/\s+/).filter(word => word.trim().length > 0);
    
    // Find sentence boundaries for words
    const wordSentenceMap: number[] = [];
    
    sentences.forEach((sentence, idx) => {
        const sentenceWords = sentence.split(/\s+/).filter(word => word.trim().length > 0);
        sentenceWords.forEach(() => {
            wordSentenceMap.push(idx);
        });
    });
    
    return { words, sentences, wordSentenceMap };
} 