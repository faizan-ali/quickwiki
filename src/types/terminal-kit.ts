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
    grabInput: any
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
    singleColumnMenu: (menuItems: string [], options: {}, callback: (error, response: ITermResponse) => void) => {}
    gridMenu: any
    progressBar: any
    bar: any
    slowTyping: any
    drawImage: any
    // Colors
    red: (text: string) => {}
}
