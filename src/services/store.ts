import { ISingleColumnMenu, ISingleLineMenu, ITerminal } from '../types/terminal-kit'
import * as term from 'terminal-kit'

class StoreService {
    private singleColumnMenu: ISingleColumnMenu
    private pagination: ISingleLineMenu
    private terminal: ITerminal = term.terminal
    private inputField: any

    public getSectionMenu = () => this.singleColumnMenu

    public setSectionMenu = (menu: ISingleColumnMenu) => menu && (this.singleColumnMenu = menu)

    public getPagination = () => this.pagination

    public setPagination = (pagination: any) => pagination && (this.pagination = pagination)

    public getTerminal = () => this.terminal

    public getInputField = () => this.inputField

    public setInputField = (inputField: any) => (this.inputField = inputField)
}

export default new StoreService()
