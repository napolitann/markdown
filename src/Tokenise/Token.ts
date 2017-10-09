import { MarkDown, Token } from '../types'

export type Char = string
export type Index = number
export type Pattern = RegExp

const UNMATCHED: Token = ['', '', '']
const space = ' '
const patternString = /\S+/

export default class {
	private source: MarkDown

	constructor (source: MarkDown) {
		this.source = source
	}

	public isEnd (): boolean {
		return !this.source
	}

	public remove (token: Token): void {
		this.source = this.source.substr(token.length)
	}

	public removeSpace (): void {
		this.remove(space)
	}

	public nextToc (): Char {
		const token = this.next(patternString)
		// console.log(`token: ${ token }`)

		return token[0]
	}

	public nextToken (pattern: Pattern): Token {
		return this.next(pattern)
	}

	private next (pattern: Pattern): Token {
		const token = this.source.match(pattern)

		return token || UNMATCHED // for nonstop parsing
	}
}
