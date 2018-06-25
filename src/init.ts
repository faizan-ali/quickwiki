import { IResponse } from './types/response'
import fetch from 'node-fetch'
import * as htmlparser from 'htmlparser2'
import applyTagStyles from './applyTagStyles'
import { isEnglish } from './utils'
import { menu } from './interactive'
import * as style from './text-styles'

const BASE_URL = 'https://en.wikipedia.org/w/api.php?action=query&formatversion=2&format=json&rvprop=content&prop=extracts&titles='
const title = process.argv[2] || 'Pakistan'

/**
 * A section title is a single word that is in English e.g. History, Etymology
 * @param {string} text
 * @return {boolean}
 */
const isSectionTitle = (text: string): boolean => Boolean(text && isEnglish(text))

export default function init() {
    // Gathers the parsed response
    const buffer: string [] = []
    const map = new Map<string, string>()

    fetch(`${BASE_URL + title}`)
        .then(res => res.json())
        .then((res: IResponse) => {
            // HTML tag e.g. p, i
            let tag = ''
            let isTitle = false
            let prevTitle = 'Summary'
            let sectionBuffer: string [] = []
            const parser = new htmlparser.Parser({
                onopentag: name => {
                    if (name === 'h2') {
                        isTitle = true
                    }
                    tag = name
                },
                ontext: text => {
                    if (isTitle) {
                        map.set(prevTitle, applyTagStyles('', sectionBuffer.join('')))
                        prevTitle = text
                        isTitle = false
                        sectionBuffer = []
                    } else if (text.length > 3) {
                        const temp = tag
                        tag = ''
                        buffer.push(applyTagStyles(temp, text))
                        sectionBuffer.push(applyTagStyles(tag, text))
                    }
                },
                onerror: error => process.stdout.write(style.error(error.message))
            }, { decodeEntities: true })

            parser.write(res.query.pages[0].extract)
            parser.end()
            menu(map)
        }).catch(console.error)
}
