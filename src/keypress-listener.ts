import { initQuickwiki } from './index'
import { ITerminal } from './types/terminal-kit'
import { exitTerminal } from './utils'
import store from './services/store'
import { print } from './utils'

const keySequences = {
    ctrlC: 'CTRL_C',
    enter: 'ENTER',
    esc: 'ESCAPE',
    q: 'q'
}

const exitCodes: string [] = [ keySequences.ctrlC, keySequences.esc ]

/**
 * Listens for keyboard events
 * Exits if any key in exitCodes is pressed since terminal-kit does not support Ctrl+C exits
 */
export default function (terminal: ITerminal) {
    let isQuery = false
    let queryBuffer: string [] = []

    terminal.grabInput(true)
    // Start the keypress listener for the process
    terminal.on('key', name => {
        if (exitCodes.includes(name)) exitTerminal()
        // If a query has been triggered by pressing 'q', collects all keystrokes to form a query that is submitted on 'Enter'
        else if (isQuery) {
            if (name === keySequences.enter) {
                isQuery = false
                // Absolutely crucial otherwise two menus will display
                store.getMenu().abort()
                initQuickwiki(queryBuffer.join(''))
                queryBuffer = []
            } else {
                queryBuffer.push(name)
                printQuery(queryBuffer.join(''))
            }
        } else if (name === keySequences.q) {
            isQuery = true
            printQuery()
        }
    })
}

const printQuery = (query = '') => {
    console.clear()
    print(`\n\n\tQuery: ${query}`)
}
