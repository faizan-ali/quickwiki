import { ISingleColumnMenu } from './../types/terminal-kit'

class StoreService {
    private singleColumnMenu: ISingleColumnMenu

    public getMenu = () => this.singleColumnMenu

    public setMenu = (menu: ISingleColumnMenu) => this.singleColumnMenu = menu
}

export const store = new StoreService()
