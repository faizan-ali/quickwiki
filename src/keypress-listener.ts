import { DEFAULT_QUERY, initQuickwiki } from './index'
import { exitTerminal } from './utils'
import store from './services/store'
import { print } from './utils'
import Keys from './constants/keys'

const terminal = store.getTerminal()

const exitCodes: string [] = [ Keys.ctrlC, Keys.esc ]

// Static variables
let isListening = false

/**
 * Listens for keyboard events
 * Exits if any key in exitCodes is pressed since terminal-kit does not support Ctrl+C exits
 */
export default function () {
    if (!isListening) {
        isListening = true
        let isQuery = false
        isListening = true
        terminal.grabInput(true)
        // Start the keypress listener for the process
        terminal.on('key', name => {
            // Exits terminal if an exit command is given
            if (exitCodes.includes(name)) exitTerminal()
            // If a query has been triggered by pressing 'q', collects all Keystrokes to form a query that is submitted on 'Enter'
            else if (!isQuery && name === Keys.q) {
                isQuery = true
                console.clear()
                print('Query:\n')
                const inputField = terminal.inputField({}, (error, input) => {
                        // Absolutely crucial otherwise two menus will display
                        store.getSectionMenu() && store.getSectionMenu().abort()
                        store.getPagination() && store.getPagination().abort
                        if (error) throw new Error(error)
                        isQuery = false
                        // Ignores blank searches
                        initQuickwiki(input || DEFAULT_QUERY)
                    }
                )
                store.setInputField(inputField)
            }
        })
    }
}
