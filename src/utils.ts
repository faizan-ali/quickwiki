import store from './services/store'
import style from './text-styles'

const terminal = store.getTerminal()
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

/**
 * Clears screen
 * If param is defined, prints error
 * If param is not defined, exits program
 */
export const exitTerminal = (error?: Error) => {
    terminal.clear()
    if (error) {
        print(style.error(`A fatal error occurred: ${error.message.replace('Error: ', '')}`))
    } else {
        terminal.grabInput(false)
        store.getSectionMenu() && store.getSectionMenu().abort()
        store.getPagination() && store.getPagination().abort()
        terminal.processExit()
    }
}
