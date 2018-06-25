import { IResponse } from './types/response'
import fetch from 'node-fetch'
import * as htmlparser from 'htmlparser2'
import applyTagStyles from './applyTagStyles'
import { runInteractiveShell } from './interactive'
import * as style from './text-styles'

const BASE_URL = 'https://en.wikipedia.org/w/api.php?action=query&formatversion=2&format=json&rvprop=content&prop=extracts&titles='
const title = process.argv[2] || 'Pakistan'
// These sections are not displayed
const ignoredSections = ['See also', 'Notes', 'References', 'Bibliography']

export default function init() {
    // Maps section titles to text
    const map = new Map<string, string>()

    fetch(`${BASE_URL + title}`)
        .then(res => res.json())
        .then((res: IResponse) => {
            // p, i
            let tag = ''
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
                    tag = name
                },
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
                    } else if (text.length > 3) {
                        sectionBuffer.push(applyTagStyles(tag, text))
                    }
                },
                onerror: error => process.stdout.write(style.error(error.message))
            }, { decodeEntities: true })

            parser.write(res.query.pages[0].extract)
            parser.end()
            runInteractiveShell(map)
        }).catch(console.error)
}
