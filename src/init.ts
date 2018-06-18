import { IResponse } from './types/response'
import fetch from 'node-fetch';
import * as htmlparser from 'htmlparser2'
import print from './print'

const BASE_URL = 'https://en.wikipedia.org/w/api.php?action=query&formatversion=2&format=json&rvprop=content&prop=extracts&titles='

export default function init() {
    fetch(`${BASE_URL + (process.argv[2] || 'Pakistan')}`)
        .then(res => res.json())
        .then((res: IResponse) => {
            let tag = ''
            const parser = new htmlparser.Parser({
                onopentag: (name, attributes) => {
                    tag = name
                },
                ontext: text => {
                    const temp = tag;
                    tag = ''
                    text.length > 3 && print(temp, text)
                }
            }, { decodeEntities: true })

            parser.write(res.query.pages[0].extract.substring(0, 6500))
            parser.end()
            console.log('\n')
        })
        .catch(console.error)
}