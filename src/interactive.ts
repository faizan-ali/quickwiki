import * as term from 'terminal-kit'
import { ITermResponse, ITerminal } from './types/terminal-kit'
import * as style from './text-styles'

const terminal: ITerminal = term.terminal

export const runInteractiveShell = (map: Map<string, string>) => {
    // terminal-kit does not exit cleanly with Ctrl + C, this adds a manual exit
    map.set('Exit', 'Exiting..')
    printer(map, 'Summary')
}

const printer = (map: Map<string, string>, key: string) => {
    if (key === 'Exit') {
        terminal.processExit()
    } else {
        console.clear()
        if (map.get(key)) {
            print(style.h2(key))
            print(map.get(key), true)
        } else {
            print(style.error(`An invalid section was queried: ${key}`))
            terminal.processExit()
        }
        // Prints out a menu of all section titles
        terminal.singleColumnMenu([...map.keys()], {}, (error, response: ITermResponse) => {
            if (error) {
                print(style.error(JSON.stringify(error)))
                terminal.processExit()
            } else {
                printer(map, response.selectedText)
            }
        })
    }
}

const print = (text: string | undefined, newline?: boolean) => (newline || !text) ? console.log(text) : process.stdout.write(text as string)
