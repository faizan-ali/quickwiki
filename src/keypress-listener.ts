// Allows listening for events from stdin
import * as readline from 'readline'
import { terminal } from './index'

/**
 * Listens for keyboard events. Exits on Ctrl-C since terminal-kit does not support keyboard command exits
 */
export default function() {
    readline.emitKeypressEvents(process.stdin)
    // Raw mode gets rid of standard keypress events and other functionality Node.js adds by default
    if (process.stdin.setRawMode) process.stdin.setRawMode(true)
    // Start the keypress listener for the process
    process.stdin.on('keypress', (str, key) => {
        // Ctrl + C
        if (key.sequence === '\u0003') {
            terminal.clear()
            terminal.processExit()
        }
    })
}
