import { initQuickwiki } from './index'
import { exitTerminal } from './utils'
import store from './services/store'
import { print } from './utils'
import keys from './constants/keys'

const terminal = store.getTerminal()

const exitCodes: string [] = [ keys.ctrlC, keys.esc ]

// Kind of static variable
let isListening = false
/**
 * Listens for keyboard events
 * Exits if any key in exitCodes is pressed since terminal-kit does not support Ctrl+C exits
 */
export default function () {
    if (!isListening) {
        isListening = true
        let isQuery = false
        let queryBuffer: string [] = []
        console.log('INIT LISTENER')
        isListening = true
        terminal.grabInput(true)
        // Start the keypress listener for the process
        terminal.on('key', name => {
            // Exits terminal if an exit command is given
            if (exitCodes.includes(name)) exitTerminal()
            // If a query has been triggered by pressing 'q', collects all keystrokes to form a query that is submitted on 'Enter'
            else if (isQuery) {
                if (name === keys.enter) {
                    isQuery = false
                    // Absolutely crucial otherwise two menus will display
                    store.getMenu().abort()
                    initQuickwiki(queryBuffer.join(''))
                    queryBuffer = []
                    // Literal backspace for typed query
                } else if (name === keys.backspace) {
                    delete queryBuffer[ queryBuffer.length - 1 ]
                    printQuery(queryBuffer.join(''))
                } else {
                    queryBuffer.push(name)
                    printQuery(queryBuffer.join(''))
                }
                // Triggers query
            } else if (name === keys.q) {
                isQuery = true
                printQuery()
            }
        })
    }
}

const printQuery = (query = '') => {
    console.clear()
    print(`\n\n\tQuery: ${query}`)
}
