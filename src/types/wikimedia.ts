export interface IResponse {
    batchComplete: boolean
    warnings: {
        'main': IResponseWarning
        'extracts': IResponseWarning
    }
    query: IResponseQuery
}

export interface IResponseWarning {
    warnings: string
}

export interface IResponseQuery {
    normalized: IResponseQueryNormalized []
    pages: IResponseQueryPages []
}

export interface IResponseQueryNormalized {
    fromencoded: boolean
    from: string
    to: string
}

export interface IResponseQueryPages {
    pageid: number
    title: string
    extract: string
}
