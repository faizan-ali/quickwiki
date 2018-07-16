import { StyleFunction } from './style'

export interface ITermResponse {
    selectedIndex: number
    selectedText: string
    submitted: boolean
    x: number
    y: number
}

export interface ITerminal {
    noFormat: (text: string) => string
    markupOnly: (text: string) => string
    fullscreen: () => {}
    processExit: () => {}
    on: (text: string, func: OnKeyFunction) => void
    windowTitle: (str: string) => void
    grabInput: (grab: boolean) => void
    getCursorLocation: any
    getColor: any
    setColor: any
    getPalette: any
    setPalette: any
    wrapColumn: any
    yesOrNo: any
    inputField: any
    fileInput: any
    singleLineMenu: any
    singleRowMenu: any
    singleColumnMenu: (menuItems: string [], options: ISingleColumnMenuOptions, callback: (error: Error, response: ITermResponse) => void) => ISingleColumnMenu
    str: ITerminalString
    gridMenu: any
    progressBar: any
    bar: any
    slowTyping: any
    drawImage: any
    clear: () => void
    // Colors
    red: (text: string) => {}
}

export interface ITerminalString {
    //Foreground colors
    defaultColor: StyleFunction
    black: StyleFunction
    red: StyleFunction
    green: StyleFunction
    yellow: StyleFunction
    blue: StyleFunction
    magenta: StyleFunction
    cyan: StyleFunction
    white: StyleFunction
    brightBlack: StyleFunction
    gray: StyleFunction
    brightRed: StyleFunction
    brightGreen: StyleFunction
    brightYellow: StyleFunction
    brightBlue: StyleFunction
    brightMagenta: StyleFunction
    brightCyan: StyleFunction
    brightWhite: StyleFunction
    color: StyleFunction
    darkColor: StyleFunction
    brightColor: StyleFunction
    color256: StyleFunction
    colorRgb: StyleFunction
    colorRgbHex: StyleFunction
    colorGrayscale: StyleFunction

    //Background colors
    bgDefaultColor: StyleFunction
    bgBlack: StyleFunction
    bgRed: StyleFunction
    bgGreen: StyleFunction
    bgYellow: StyleFunction
    bgBlue: StyleFunction
    bgMagenta: StyleFunction
    bgCyan: StyleFunction
    bgWhite: StyleFunction
    bgDarkColor: StyleFunction
    bgBrightBlack: StyleFunction
    bgGray: StyleFunction
    bgBrightRed: StyleFunction
    bgBrightGreen: StyleFunction
    bgBrightYellow: StyleFunction
    bgBrightBlue: StyleFunction
    bgBrightMagenta: StyleFunction
    bgBrightCyan: StyleFunction
    bgColor: StyleFunction
    bgBrightWhite: StyleFunction
    bgBrightColor: StyleFunction
    bgColor256: StyleFunction
    bgColorRgb: StyleFunction
    bgColorRgbHex: StyleFunction
    bgColorGrayscale: StyleFunction

    //Styles
    styleReset: StyleFunction
    bold: StyleFunction
    dim: StyleFunction
    italic: StyleFunction
    underline: StyleFunction
    blink: StyleFunction
    inverse: StyleFunction
    hidden: StyleFunction
    strike: StyleFunction
}

export type OnKeyFunction = (name: string, matches: string [], data: IOnKeyFunctionData) => void

interface IOnKeyFunctionData {
    isCharacter: boolean
    codepoint: number
    code: number
}

export interface ISingleColumnMenu {
    abort: () => void
    on: (text: string, func: (data: any) => void) => void
}

export interface ISingleLineMenu {
    abort: () => void
    on: (text: string, func: (data: any) => void) => void
}

interface ISingleColumnMenuOptions {
    exitOnUnexpectedKey?: boolean
    continueOnSubmit?: boolean
    keyBindings?: any
}
