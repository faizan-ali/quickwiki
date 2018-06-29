export class MappingError extends Error {}

export class HTMLParserError extends Error {}

export class TerminalMenuError extends Error {}

export class WikimediaAPIError extends Error {}

export class InvalidQueryError extends Error {
    constructor() {
        super('Invalid query, spelling may be incorrect or no such title found')
    }
}
