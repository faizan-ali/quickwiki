import keyWords from './key-words'
import style from './text-styles'
import tags from './tags'

/**
 *
 * @param {string} htmlTag
 * @param {string} text
 * @return {string}
 */
export default function applyTagStyles(htmlTag: string, text: string): string {
    // Highlighting words in red
    keyWords.forEach(word => text = text.replace(word, style.bold(style.bgRed(word))))

    Object.keys(tags).forEach(tag => {
        if (htmlTag === tag && style[ tag ]) {
            text = style[ tag ](text)
        }
    })

    return text
}
