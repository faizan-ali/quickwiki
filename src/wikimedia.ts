import fetch from 'node-fetch'
import { InvalidQueryError, WikimediaAPIError } from './types/error'
import { IResponse } from './types/wikimedia'

// Base URL configured with properties needed for any request
const BASE_URL = 'https://en.wikipedia.org/w/api.php?action=query&formatversion=2&format=json&rvprop=content'

/**
 *
 * @param {string} title
 * @return {Promise<Response>}
 * @throws WikimediaAPIError
 */
export const fetchTitleExtract = (title: string) => {
    return fetch(`${BASE_URL}&prop=extracts&titles=${title}`)
        .then(res => res.json())
        .then((res: IResponse) => {
            if (res.query.pages[ 0 ].missing) {
                throw new InvalidQueryError()
            }
            return res
        })
        .catch(error => { throw new WikimediaAPIError(error) })
}
