import quickwiki from './quickwiki'
import { fetchTitleExtract } from './wikimedia'
import { parse } from './parse'
import initListener from './keypress-listener'
import { exitTerminal } from './utils'

export const initQuickwiki = (title: string) =>
    fetchTitleExtract(title)
        .then(parse)
        .then(quickwiki)
        .catch(exitTerminal)

try {
    // Title to query for
    const title = process.argv[ 2 ] || 'Democracy'
    initListener()
    initQuickwiki(title)
} catch (error) {
    exitTerminal(error)
}
