import { ITermResponse } from './types/terminal-kit'
import style from './text-styles'
import { exitTerminal, print } from './utils'
import { MappingError, TerminalMenuError, TerminalSingleColumnMenuError, TerminalSingleLineMenuError } from './types/error'
import store from './services/store'
import Keys from './constants/keys'

const terminal = store.getTerminal()
const PAGE_SIZE = 5600

/**
 *
 * @param {Map<string, string>} map Un-styled section titles mapped to styled text
 * @param {string} key The section to display (defaults to Summary)
 * @throws TerminalMenuError Thrown if the terminal menu function breaks
 */
export default function quickwiki(map: Map<string, string>, key = 'Summary', startIndex = 0, endIndex = PAGE_SIZE): void {
    terminal.windowTitle(key)
    if (key === 'Exit') exitTerminal()
    else if (map.has(key)) {
        const pages = getPages(map.get(key)!)
        terminal.clear()

        const singleRowMenuKeyBindings = {}
        singleRowMenuKeyBindings[ Keys.leftArrow ] = 'previous'
        singleRowMenuKeyBindings[ Keys.rightArrow ] = 'next'
        singleRowMenuKeyBindings[ Keys.forwardSlash ] = 'submit'

        // Only need pagination if more than one page
        if (pages.length > 1) {
            const singleRowMenu = terminal.singleLineMenu(pages, {
                separator: ' | ',
                keyBindings: singleRowMenuKeyBindings
            }, (error, response) => {
                if (!response) throw new TerminalSingleLineMenuError('Callback params undefined')
                if (error) throw new TerminalSingleLineMenuError(JSON.stringify(error))
                const page = Number.parseInt(response.selectedText)
                const newStartIndex = (page * PAGE_SIZE) - PAGE_SIZE
                const newEndIndex = page * PAGE_SIZE

                // @ts-ignore
                store.getPagination() && store.getPagination().abort()
                store.getSectionMenu() && store.getSectionMenu().abort()
                quickwiki(map, key, newStartIndex, newEndIndex)
            })

            store.setPagination(singleRowMenu)
        }

        process.stdout.write('\n\n')
        print(style.h2(key))
        map.get(key) && print(map.get(key)!.substring(startIndex, endIndex), true)
        // Prints out a menu of all section titles
        const sectionMenu = terminal.singleColumnMenu([ ...map.keys() ], {
            continueOnSubmit: false,
            keyBindings: { 'DOWN': 'next', 'UP': 'previous', 'ENTER': 'submit' }
        }, (error: Error, response: ITermResponse) => {
            if (!response) throw new TerminalSingleColumnMenuError('Callback params undefined')
            if (error) throw new TerminalSingleColumnMenuError(JSON.stringify(error))
            else {
                // @ts-ignore
                store.getPagination() && store.getPagination().stop()
                store.getSectionMenu() && store.getSectionMenu().abort()
                quickwiki(map, response.selectedText)
            }
        })

        store.setSectionMenu(sectionMenu)
    } else {
        throw new MappingError(`An invalid section was queried - ${key}\n\nExiting`)
    }
}

const getPages = (text: string): number [] => {
    const pages: number [] = []

    for (let index = 0; index < text.length / PAGE_SIZE; index++) {
        pages[ index ] = index + 1
    }

    return pages
}
