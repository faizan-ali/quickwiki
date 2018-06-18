import * as Chalk from 'chalk'
import keyWords from './key-words';

const chalk = Chalk.default

/**
 *
 * @param {string} tag
 * @param {string} text
 */
export default function print(tag: string, text: string) {
    let stylingFunctions: ((string) => string) [] = []
    // Highlighting words
    keyWords.forEach(word => text = text.replace(word, chalk.bgRedBright(word)))

    switch (tag) {
        case 'h2':
            stylingFunctions.push(chalk.bold, chalk.bgBlack, chalk.whiteBright)
            break
        case 'h3':
            stylingFunctions.push(chalk.bold, chalk.bgBlackBright, chalk.whiteBright)
            break
        case 'b':
            stylingFunctions.push(chalk.bold, chalk.whiteBright)
            break
        case 'i':
            stylingFunctions.push(chalk.italic, chalk.whiteBright)
            break
        case 'span':
            stylingFunctions.push(text => `|\t ${text} \t|`)
            break
        case 'p':
            stylingFunctions.push(chalk.greenBright, text => '\n=========================================\n' + text)
            break
        default:
            stylingFunctions.push(chalk.greenBright)
    }

    stylingFunctions.forEach(f => text = f(text))
    process.stdout.write(text)
}
