import { ITermResponse } from './types/terminal-kit'
import { terminal } from './index'
import style from './text-styles'
import { print } from './utils'
import { MappingError, TerminalMenuError } from './types/error'

/**
 *
 * @param {Map<string, string>} map Un-styled section titles mapped to styled text
 * @param {string} key The section to display (defaults to Summary)
 * @throws TerminalMenuError Thrown if the terminal menu function breaks
 */
export default function quickwiki(map: Map<string, string>, key = 'Summary'): void {
    terminal.windowTitle(key)
    if (key === 'Exit') terminal.processExit()
    else {
        terminal.clear()
        if (map.has(key)) {
            print(style.h2(key))
            print(map.get(key), true)
        } else throw new MappingError(`An invalid section was queried - ${key}\n\nExiting`)
        // Prints out a menu of all section titles
        terminal.singleColumnMenu([ ...map.keys() ], {}, (error, response: ITermResponse) => {
            if (error) throw new TerminalMenuError(JSON.stringify(error))
            else quickwiki(map, response.selectedText)
        })
    }
}
