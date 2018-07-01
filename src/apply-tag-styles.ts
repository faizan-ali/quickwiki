import keyWords from './constants/key-words'
import style from './text-styles'
import Tags from './constants/tags'

/**
 *
 * @param {string} textTag
 * @param {string} text
 * @return {string}
 */

export default function applyTagStyles(textTag: string, text: string): string {
    // Highlighting words in red
    keyWords.forEach(word => text = text.replace(word, style.b(style.bgRed(word))))

    const tag = Tags[ textTag ]
    if (tag && style[ tag ]) {
        text = (style[ tag ])(text)
    }

    return text
}
