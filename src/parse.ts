import { IResponse } from './types/wikimedia'
import applyTagStyles from './apply-tag-styles'
import style from './text-styles'
import { isBlankLine } from './utils'
import * as htmlparser from 'htmlparser2'
import ignoredSections from './constants/ignored-sections'
import { WikimediaAPIError } from './types/error'

export const parse = (res: IResponse): Map<string, string> => {
    // Maps section titles to subtitles and text
    const map = new Map<string, string>()

    if (!res || !res.query || !res.query.pages || !res.query.pages[ 0 ] || !res.query.pages[ 0 ].extract) {
        throw new WikimediaAPIError('Invalid/malformed response from WikiMedia API')
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
            } else if (!isBlankLine(text)) {
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
    return map
}
