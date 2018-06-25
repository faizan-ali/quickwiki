import keyWords from './key-words'
import style from './text-styles'
import tags from './tags'
import { StyleFunction } from './types/style'

/**
 *
 * @param {string} htmlTag
 * @param {string} text
 * @return {string}
 */

export default function applyTagStyles(htmlTag: string, text: string): string {
    // Highlighting words in red
    keyWords.forEach(word => text = text.replace(word, style.b(style.bgRed(word))))

    for (const tag in tags) {
        if (htmlTag === tag && style[ tag ]) {
            text = (style[ tag ] as StyleFunction)(text)
            break
        }
    }

    return text
}
