import * as term from 'terminal-kit'
import { ITermResponse, ITerminal } from './types/terminal-kit'
import * as style from './text-styles'

const terminal: ITerminal = term.terminal

export const menu = (map: Map<string, string>) => {
    map.set('Exit', 'Exiting..')
    printer(map, 'Summary')
}

const printer = (map: Map<string, string>, key: string) => {
    if (key === 'Exit') {
        terminal.processExit()
    } else {
        console.clear()
        if (map.get(key)) {
            process.stdout.write(style.h2(key))
            print(map.get(key), true)
        } else {
            print(style.error('An error occurred'))
            terminal.processExit()
        }
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

const print = (text: string | undefined, newline?: boolean) => newline ? console.log(text) : process.stdout.write(text as string)
