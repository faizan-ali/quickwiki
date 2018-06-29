import { ITermResponse } from './types/terminal-kit'
import style from './text-styles'
import { exitTerminal, print } from './utils'
import { MappingError, TerminalMenuError } from './types/error'
import store from './services/store'

const terminal = store.getTerminal()
/**
 *
 * @param {Map<string, string>} map Un-styled section titles mapped to styled text
 * @param {string} key The section to display (defaults to Summary)
 * @throws TerminalMenuError Thrown if the terminal menu function breaks
 */
export default function quickwiki(map: Map<string, string>, key = 'Summary'): void {
    terminal.windowTitle(key)
    if (key === 'Exit') exitTerminal()
    else {
        terminal.clear()
        if (map.has(key)) {
            print(style.h2(key))
            print(map.get(key), true)
        } else throw new MappingError(`An invalid section was queried - ${key}\n\nExiting`)
        // Prints out a menu of all section titles
        const singleColumnMenu = terminal.singleColumnMenu([ ...map.keys() ], { continueOnSubmit: false }, (error: Error, response: ITermResponse) => {
            if (!response) throw new TerminalMenuError('Callback params undefined')
            if (error) throw new TerminalMenuError(JSON.stringify(error))
            else quickwiki(map, response.selectedText)
        })

        store.setMenu(singleColumnMenu)
    }
}
