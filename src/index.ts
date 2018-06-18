import fetch from 'node-fetch';
import { IResponse } from './types/response'
import * as htmlparser from 'htmlparser2'
import * as Chalk from 'chalk'

const chalk = Chalk.default

const BASE_URL = 'https://en.wikipedia.org/w/api.php?action=query&formatversion=2&format=json&rvprop=content&prop=extracts&titles='

const hotWords = ['nuclear', 'power', 'created', 'independent', 'independence', 'war', 'terrorism', 'population', 'human rights']

const print = (tag: string, text: string) => {
    const printf = text => process.stdout.write(text)
    let stylingFunctions: ((string) => string) [] = []
    hotWords.forEach(word => text = text.replace(word, chalk.bgRedBright(word)))

    switch (tag) {
        case 'h2':
            stylingFunctions.push(chalk.bold, chalk.bgBlack, chalk.whiteBright)
            break
        case 'h3':
            stylingFunctions.push(chalk.bold, chalk.bgBlackBright, chalk.whiteBright)
            break
        case 'b':
            stylingFunctions.push(chalk.bold, chalk.whiteBright)
            break
        case 'i':
            stylingFunctions.push(chalk.italic, chalk.whiteBright)
            break
        case 'span':
            stylingFunctions.push(text => `|\t ${text} \t|`)
            break
        case 'p':
            stylingFunctions.push(chalk.greenBright, text => '\n=========================================\n' + text)
            break
        default:
            stylingFunctions.push(chalk.greenBright)
    }

    stylingFunctions.forEach(f => text = f(text))
    printf(text)
}

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
    })
    .catch(console.error)
