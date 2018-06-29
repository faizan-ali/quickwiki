import quickwiki from './quickwiki'
import * as term from 'terminal-kit'
import { ITerminal } from './types/terminal-kit'
import style from './text-styles'
import { fetchTitleExtract } from './wikimedia'
import { parse } from './parse'
import initListener from './keypress-listener'
import { exitTerminal, print } from './utils'

export const terminal: ITerminal = term.terminal

// Title to query for
const title = process.argv[ 2 ] || 'Pakistan'

export const initQuickwiki = (title: string) => fetchTitleExtract(title)
    .then(parse)
    .then(quickwiki)
    // TODO: Do not throw error on no response from bad queries
    .catch((error: Error) => { throw error })

try {
    initListener(terminal)
    initQuickwiki(title)
} catch (error) {
    print(style.error(`A fatal error occurred: ${JSON.stringify(error)}`))
    exitTerminal()
}
