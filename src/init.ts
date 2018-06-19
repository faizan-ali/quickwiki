import { IResponse } from './types/response'
import fetch from 'node-fetch'
import * as htmlparser from 'htmlparser2'
import * as style from './text-styles'
import applyTagStyles, { isSectionTitle } from './applyTagStyles'

const BASE_URL = 'https://en.wikipedia.org/w/api.php?action=query&formatversion=2&format=json&rvprop=content&prop=extracts&titles='
const title = process.argv[2] || 'Pakistan'

export default function init() {
    // Gathers the parsed response
    const buffer: string [] = []

    fetch(`${BASE_URL + title}`)
        .then(res => res.json())
        .then((res: IResponse) => {
            // HTML tag e.g. p, i
            let tag = ''
            const parser = new htmlparser.Parser({
                onopentag: (name, attributes) => tag = name,
                ontext: text => {
                    const temp = tag
                    tag = ''
                    if (text.length > 3) {
                        buffer.push(applyTagStyles(temp, text))
                    }
                }
            }, { decodeEntities: true })

            parser.write(res.query.pages[0].extract.substring(0, 6800))
            parser.end()
            console.log('')
        })
        .then(() => {
            let startIndex = 0
            buffer.forEach((value, currIndex) => {
                if (isSectionTitle(value)) {
                    if (startIndex) {
                        const section = buffer.slice(startIndex + 1, currIndex).join('')
                        // Console.log adds unnecessary line-breaks
                        process.stdout.write(style.sectionTitle(value))
                        process.stdout.write(section)
                        startIndex = 0
                    } else {
                        startIndex = currIndex
                    }
                } else {
                    process.stdout.write(value)
                }
            })
            console.log('\n')
        })
        .catch(console.error)
}
