import quickwiki from './quickwiki'
import { fetchTitleExtract } from './wikimedia'
import { parse } from './parse'
import initListener from './keypress-listener'
import { exitTerminal } from './utils'
import store from './services/store'

// Title to query for
const title = process.argv[ 2 ] || 'Pakistan'

export const initQuickwiki = (title: string) => fetchTitleExtract(title)
    .then(parse)
    .then(quickwiki)
    // TODO: Do not throw error on no response from bad queries
    .catch(exitTerminal)
try {
    initListener(store.getTerminal())
    initQuickwiki(title)
} catch (error) {
    exitTerminal(error)
}
