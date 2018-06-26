import quickwiki from './quickwiki'
import * as term from 'terminal-kit'
import { ITerminal } from './types/terminal-kit'
import style from './text-styles'
import { fetchTitleExtract } from './wikimedia'
import { parse } from './parse'
import initListener from './keypress-listener'

export const terminal: ITerminal = term.terminal

// Title to query for
const title = process.argv[ 2 ] || 'Pakistan'

try {
    initListener()
    fetchTitleExtract(title)
        .then(parse)
        .then(quickwiki)
} catch (error) {
    process.stdout.write(style.error(`A fatal error occurred: ${JSON.stringify(error)}`))
    terminal.processExit()
}
