/**
 *
 * @param {string} word
 * @return {"" | boolean}
 */
export const isWord = (word: string) => word && !/\s/.test(word)

/**
 *
 * @param {string} sentence
 * @return {string[] | number}
 */
export const numWords = (sentence: string) => sentence ? sentence.trim().split(' ').length : 0

/**
 *
 * @param {string} word
 * @return {boolean}
 */
export const isEnglish = (word: string) => word && /^[A-Za-z]*$/.test(word.trim())

/**
 *
 * @param {string} line
 * @return {boolean}
 */
export const isBlankLine = (line: string) => line && /^\s*$/.test(line)

/**
 *
 * @param {string | undefined} text
 * @param {boolean} printNewLine
 * @return {void | boolean}
 */
export const print = (text: string | undefined, printNewLine?: boolean) =>
    (printNewLine || !text) ? console.log(text) : process.stdout.write(text)
