#! /usr/bin/env node

import quickwiki from './quickwiki'
import { fetchTitleExtract } from './wikimedia'
import { parse } from './parse'
import initListener from './keypress-listener'
import { exitTerminal } from './utils'

export const DEFAULT_QUERY = 'Democracy'

export const initQuickwiki = (title: string) =>
    fetchTitleExtract(title)
        .then(parse)
        .then(quickwiki)
        .catch(exitTerminal)

try {
    // Title to query for
    const query = process.argv[ 2 ] || DEFAULT_QUERY
    initListener()
    initQuickwiki(query)
} catch (error) {
    exitTerminal(error)
}
