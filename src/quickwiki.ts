import { TerminalMenuError, ITermResponse } from './types/terminal-kit'
import { terminal } from './index'
import style from './text-styles'

/**
 *
 * @param {Map<string, string>} map
 * @param {string} key
 * @throws TerminalMenuError
 */
export default function quickwiki(map: Map<string, string>, key: string): void {
    terminal.windowTitle(key)
    if (key === 'Exit') terminal.processExit()
    else {
        terminal.clear()
        if (map.has(key)) {
            print(style.h2(key))
            print(map.get(key), true)
        } else throw new TerminalMenuError(`An invalid section was queried - ${key}\n\nExiting`)
        // Prints out a menu of all section titles
        terminal.singleColumnMenu([ ...map.keys() ], {}, (error, response: ITermResponse) => {
            if (error) throw new TerminalMenuError(JSON.stringify(error))
            else quickwiki(map, response.selectedText)
        })
    }
}

const print = (text: string | undefined, printNewLine?: boolean) => (printNewLine || !text) ? console.log(text) : process.stdout.write(text as string)
