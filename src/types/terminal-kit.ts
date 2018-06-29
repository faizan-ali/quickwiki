export interface ITermResponse {
    selectedIndex: number
    selectedText: string
    submitted: boolean
    x: number
    y: number
}

export interface ITerminal {
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
    gridMenu: any
    progressBar: any
    bar: any
    slowTyping: any
    drawImage: any
    clear: () => void
    // Colors
    red: (text: string) => {}
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

interface ISingleColumnMenuOptions {
    exitOnUnexpectedKey?: boolean
    continueOnSubmit?: boolean
}
