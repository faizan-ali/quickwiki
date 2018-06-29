import { ISingleColumnMenu } from './../types/terminal-kit'
import { ITerminal } from '../types/terminal-kit'
import * as term from 'terminal-kit'

class StoreService {
    private singleColumnMenu: ISingleColumnMenu
    private terminal: ITerminal = term.terminal

    public getMenu = () => this.singleColumnMenu

    public setMenu = (menu: ISingleColumnMenu) => this.singleColumnMenu = menu

    public getTerminal = () => this.terminal
}

export default new StoreService()
