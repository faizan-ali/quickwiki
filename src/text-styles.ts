import * as Chalk from 'chalk'
import { StyleFunction } from './types/style'

const chalk = Chalk.default
// Applies an array of styling functions to text and returns the final result
const apply = (styles: StyleFunction [], text: string): string =>
    styles.reduce((previous: string, style: StyleFunction | undefined) =>
        style ? style(previous) : previous, text)

const preLineBreak = text => `\n${text}`
const postLineBreak = text => `${text}\n`
const tab = text => `\t${text}`

// This is purposefully untyped for IDE auto-completion assistance
export default {
    error: text => apply([ chalk.red, chalk.bold, postLineBreak, preLineBreak ], text),
    h2: text => apply([ text => `==================== ${text} =====================`, chalk.bold, postLineBreak ], text),
    h3: text => apply([ text => `### ${text} ###`, chalk.bold, chalk.white, tab, preLineBreak ], text),
    b: text => apply([ chalk.bold, chalk.whiteBright ], text),
    i: text => apply([ chalk.italic, chalk.whiteBright ], text),
    p: text => apply([ chalk.greenBright, text => `---------------------------------------\n${text}`, preLineBreak ], text),
    li: text => apply([ tab, chalk.greenBright ], text),
    sup: text => apply([ chalk.greenBright ], text),
    cite: text => apply([ chalk.greenBright ], text),
    span: text => apply([ chalk.bold ], text),
    br: text => apply([ postLineBreak ], text),
    bgRed: chalk.bgRedBright,
    green: chalk.greenBright,
    reset: chalk.reset,
    '': text => apply([ chalk.greenBright ], text),
    default: text => apply([ chalk.greenBright ], text)
}
