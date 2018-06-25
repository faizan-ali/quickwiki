import * as Chalk from 'chalk'

const chalk = Chalk.default
const apply = (styles, text): string => styles.reduce((previousValue, currentFunction) => currentFunction(previousValue), text)

export type StyleFunction = (text: string) => string

const preLineBreak = text => `\n${text}`
const postLineBreak = text => `${text}\n`

export const error: StyleFunction = text => apply([chalk.red, chalk.bold, postLineBreak], text)
export const h2: StyleFunction = text => apply([text => `==================== ${text} =====================`, postLineBreak], text)
export const h3: StyleFunction = text => apply([chalk.bold, chalk.bgBlackBright, postLineBreak], text)
export const bold: StyleFunction = text => apply([chalk.bold, chalk.whiteBright], text)
export const italic: StyleFunction = text => apply([chalk.italic, chalk.whiteBright], text)
export const p: StyleFunction = text => apply([chalk.greenBright, text => `\n---------------------------------------\n${text}`], text)
export const bgRed: StyleFunction = chalk.bgRedBright
export const green: StyleFunction = chalk.greenBright
export const sectionTitle: StyleFunction = text => apply([text => `==================== ${text} =====================`], text)
export const sectionSubtitle: StyleFunction = text => apply([text => `### ${text} ###`, postLineBreak, preLineBreak, preLineBreak], text)
