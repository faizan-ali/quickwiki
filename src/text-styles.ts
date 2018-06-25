import * as Chalk from 'chalk'
import { StyleFunction } from './types/style'

const chalk = Chalk.default
// Applies an array of styling functions to text and returns the final result
const apply = (styles: StyleFunction [], text: string): string =>
    styles.reduce((previousValue: string, currentFunction: StyleFunction | undefined) =>
        currentFunction ? currentFunction(previousValue) : previousValue, text)

const preLineBreak = text => `\n${text}`
const postLineBreak = text => `${text}\n`
const tab = text => `\t${text}`

export default {
    error: text => apply([ chalk.red, chalk.bold, postLineBreak, preLineBreak ], text),
    h2: text => apply([ text => `==================== ${text} =====================`, chalk.bold, postLineBreak ], text),
    h3: text => apply([ text => `### ${text} ###`, chalk.bold, chalk.white, tab, preLineBreak ], text),
    b: text => apply([ chalk.bold, chalk.whiteBright ], text),
    i: text => apply([ chalk.italic, chalk.whiteBright ], text),
    p: text => apply([ chalk.greenBright, text => `---------------------------------------\n${text}`, preLineBreak ], text),
    li: text => apply([ tab, this.green ], text),
    sup: text => apply([ this.green ], text),
    cite: text => apply([ this.green ], text),
    span: text => apply([ this.green ], text),
    br: text => apply([ postLineBreak ], text),
    bgRed: chalk.bgRedBright,
    green: chalk.greenBright,
    reset: chalk.reset,
    '': text => apply([ this.green ], text),
    default: text => apply([ this.green ], text)
}
