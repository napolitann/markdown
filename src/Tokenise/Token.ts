import { MarkDown, Token } from '../types'

export type Char = string
export type Index = number
export type Pattern = RegExp

const UNMATCHED: Token = ['', '', '']
const space = ' '

export default class Type {
	private source: MarkDown

	constructor (source: MarkDown) {
		this.source = source
	}

	public isEnd (): boolean {
		return !!this.source
	}

	public nextChar (): Char {
		return this.source[0]
	}

	public next (pattern: Pattern): Token {
		const nextToken = this.source.match(pattern)

		return nextToken || UNMATCHED // for nonstop parsing
	}

	public remove (token: Token) {
		this.source = this.source.substr(token.length)
	}

	public removeSpace () {
		this.remove(space)
	}
}
