import { ISingleColumnMenu, ITerminal } from '../types/terminal-kit'
import * as term from 'terminal-kit'

class StoreService {
    private singleColumnMenu: ISingleColumnMenu
    private terminal: ITerminal = term.terminal
    private inputField: any

    public getMenu = () => this.singleColumnMenu

    public setMenu = (menu: ISingleColumnMenu) => this.singleColumnMenu = menu

    public getTerminal = () => this.terminal

    public getInputField = () => this.inputField

    public setInputField = (inputField: any) => this.inputField = inputField
}

export default new StoreService()
