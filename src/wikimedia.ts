import fetch from 'node-fetch'
import { WikimediaAPIError } from './types/wikimedia'

// Base URL configured with properties needed for any request
const BASE_URL = 'https://en.wikipedia.org/w/api.php?action=query&formatversion=2&format=json&rvprop=content'

/**
 *
 * @param {string} title
 * @return {Promise<Response>}
 * @throws WikimediaAPIError
 */
export const fetchExtract = (title: string) => {
    return fetch(`${BASE_URL}&prop=extracts&titles=${title}`)
        .then(res => res.json())
        .catch(error => { throw new WikimediaAPIError(error) })
}
