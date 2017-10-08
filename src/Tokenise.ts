import { MarkDown, Token, Tokens } from './types'
import TOKENS from './TOKENS'
import PATTERNS from './PATTERNS'

export type Char = string
export type Index = number
export type Pattern = RegExp

export default class Tokenise {
	private source: MarkDown
	private sourceLength: number
	private result: Tokens

	private index: Index = 0

	static init (source: MarkDown): Tokens {
		const tokenise = new Tokenise(source)
		tokenise.index += 1

		return source.split(/[\r\n]/g)
	}

	private constructor (source: MarkDown) {
		this.source = source
		this.sourceLength = source.length
		this.result = [source]

		this.init()
	}

	private init () {
		while (this.index < this.sourceLength) {
			switch (this.nextChar()) {
				case TOKENS.HEADING:
					console.log(this.nextToken(PATTERNS.HEADING))
					break
				default:
					continue
			}
		}
	}

	private nextChar (): Char {
		return this.source[this.index++]
	}

	private nextToken (pattern: Pattern): Token {
		return this.source.match(pattern)
	}
}
