import { initQuickwiki } from './index'
import { ITerminal } from './types/terminal-kit'
import { exitTerminal } from './utils'
import { fetchTitleExtract } from './wikimedia'
import { store } from './services/store'

const keySequences = {
    ctrlC: 'CTRL_C',
    enter: 'ENTER',
    esc: 'ESCAPE',
    q: 'q',
    e: 'e'
}

const exitCodes: string [] = [ keySequences.ctrlC, keySequences.esc, keySequences.e ]

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
        // If a query has been triggered by pressing 'q', collects all keystrokes to form a query that is submitted on 'Enter'
        if (isQuery) {
            const query = queryBuffer.join('')
            if (name === keySequences.enter) {
                isQuery = false
                // Absolutely crucial otherwise two menus will display
                store.getMenu().abort()
                initQuickwiki(query)
                queryBuffer = []
            } else {
                queryBuffer.push(name)
                // TODO: Implement printing typed query
                // print(query)
            }
        } else if (name === keySequences.q) isQuery = true
        else if (exitCodes.includes(name)) exitTerminal()
    })
}
