import quickwiki from './quickwiki'
import style from './text-styles'
import { fetchTitleExtract } from './wikimedia'
import { parse } from './parse'
import initListener from './keypress-listener'
import { exitTerminal, print } from './utils'
import store from './services/store'

// Title to query for
const title = process.argv[ 2 ] || 'Pakistan'

export const initQuickwiki = (title: string) => fetchTitleExtract(title)
    .then(parse)
    .then(quickwiki)
    // TODO: Do not throw error on no response from bad queries
    .catch((error: Error) => { throw error })

try {
    initListener(store.getTerminal())
    initQuickwiki(title)
} catch (error) {
    print(style.error(`A fatal error occurred: ${JSON.stringify(error)}`))
    exitTerminal()
}
