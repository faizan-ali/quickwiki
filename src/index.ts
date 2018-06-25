import * as htmlparser from 'htmlparser2'
import applyTagStyles from './applyTagStyles'
import quickwiki from './quickwiki'
import { isBlankLine } from './utils'
import * as term from 'terminal-kit'
import { ITerminal } from './types/terminal-kit'
import style from './text-styles'
import { fetchExtract } from './wikimedia'
import { IResponse } from './types/wikimedia'
import { HTMLParserError } from './types/htmlparser'

export const terminal: ITerminal = term.terminal

const title = process.argv[ 2 ] || 'Pakistan'
// These sections are not displayed
const ignoredSections = [ 'See also', 'Notes', 'References', 'Bibliography' ]

const init = () => {
    // Maps section titles to subtitles and text
    const map = new Map<string, string>()

    fetchExtract(title)
        .then((res: IResponse) => {
            if (!res || !res.query || !res.query.pages || !res.query.pages[ 0 ] || !res.query.pages[ 0 ].extract) {
                throw new Error('Invalid/malformed response from WikiMedia API')
            }

            // p, i
            let htmlTag = ''
            // History, Etymology, Economy, denoted by h2 tags
            let isSectionTitle = false
            // Industry within Economy, denoted by h3 tags
            let isSectionSubtitle = false
            let prevTitle = 'Summary'
            let prevSubtitle = ''
            // Holds all text for a single section
            let sectionBuffer: string [] = []
            const parser = new htmlparser.Parser({
                onopentag: name => {
                    if (name === 'h2') {
                        isSectionTitle = true
                    } else if (name === 'h3' || name === 'h4') {
                        isSectionSubtitle = true
                    }
                    htmlTag = name
                },
                // TODO: This really needs a couple tests
                ontext: text => {
                    if (isSectionTitle) {
                        isSectionTitle = false

                        if (!ignoredSections.includes(prevTitle)) {
                            map.set(prevTitle, applyTagStyles('', sectionBuffer.join('')))
                        }

                        prevTitle = text
                        sectionBuffer = []
                    } else if (isSectionSubtitle) {
                        isSectionSubtitle = false

                        if (prevSubtitle) {
                            sectionBuffer.push(applyTagStyles('h3', text))
                            prevSubtitle = ''
                        }

                        prevSubtitle = text
                        // Text length check filters out random small words/letters that sometimes show up
                    } else if (text.length > 3 && !isBlankLine(text)) {
                        sectionBuffer.push(applyTagStyles(htmlTag, text))
                    }
                },
                // An error while reading a single tag should fail gracefully
                onerror: error => process.stdout.write(style.error(error.message))
            }, { decodeEntities: true })
            parser.write(res.query.pages[ 0 ].extract)
            parser.end()
            // terminal-kit does not exit cleanly with Ctrl + C, this adds a manual exit
            map.set('Exit', 'Exiting')
            quickwiki(map, 'Summary')
        })
        .catch(error => {
            throw new HTMLParserError(error)
        })
}

try {
    init()
} catch (error) {
    process.stdout.write(style.error(`A fatal error occurred: ${JSON.stringify(error)}`))
    terminal.processExit()
}
