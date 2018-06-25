import keyWords from './key-words'
import * as style from './text-styles'

/**
 *
 * @param {string} tag
 * @param {string} text
 * @return {string}
 */
export default function applyTagStyles(tag: string, text: string): string {
    // Highlighting words
    keyWords.forEach(word => text = text.replace(word, style.bgRed(word)))

    switch (tag) {
        case 'h2':
            text = style.h2(text)
            break
        case 'h3':
            text = style.h3(text)
            break
        case 'b':
            text = style.bold(text)
            break
        case 'i':
            text = style.italic(text)
            break
        case 'span':
            // TODO: Unit test ordering
            // This is to catch titles of sections e.g. Etymology or History. Spans are uncommon in the response, appearing
            // only on titles and around the native language spelling of a country.
            //  isSectionTitle(text) && stylingFunctions.push(text => `|\t ${text} \t|`, preLineBreak, postLineBreak)
            break
        case 'p':
            text = style.p(text)
            break
        default:
            text = style.green(text)
    }

    return text
}
