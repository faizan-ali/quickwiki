class QuickWikiError extends Error {
    constructor(error: string) {
        super(error)
        console.log(this.constructor.name)
    }
}

export class MappingError extends QuickWikiError {}

export class WikimediaAPIError extends QuickWikiError {}

export class HTMLParserError extends QuickWikiError {}

export class TerminalMenuError extends QuickWikiError {}

export class TerminalSingleColumnMenuError extends QuickWikiError {}

export class TerminalSingleLineMenuError extends QuickWikiError {}

export class InvalidQueryError extends QuickWikiError {
    constructor() {
        super('Invalid query, spelling may be incorrect or no such title found')
    }
}
