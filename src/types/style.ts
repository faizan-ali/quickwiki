export type StyleFunction = (text: string) => string

export interface IStyle {
    [ style: string ]: StyleFunction
}
