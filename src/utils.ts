/**
 *
 * @param {string} string
 * @return {"" | boolean}
 */
export const isWord = (string: string) => string && !/\s/.test(string)

/**
 *
 * @param {string} sentence
 * @return {string[] | number}
 */
export const numWords = (sentence: string) => sentence ? sentence.trim().split(' ').length : 0

/**
 *
 * @param {string} word
 * @return {"" | boolean}
 */
export const isEnglish = (word: string) => word && /^[A-Za-z]*$/.test(word.trim())