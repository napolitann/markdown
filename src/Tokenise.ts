import { MarkDown, Token, Tokens } from './types'
import TOKENS from './TOKENS'
import PATTERNS from './PATTERNS'

export type Char = string
export type Index = number
export type Pattern = RegExp

const UNMATCHED: Token = ['', '', '']

const FAIL = false
const SUCCESS = true

export default class Tokenise {
	private source: MarkDown
	private result: Tokens = []

	private index: Index = 0
	private count = 0

	static init (source: MarkDown): Tokens | any {
		return (new Tokenise(source)).result
	}

	private constructor (source: MarkDown) {
		this.source = source

		this.init()
	}

	private init () {
		while (!!this.source) {
			this.count += 1
			if (this.count > 20) {
				return console.error('over clock')
			}

			switch (this.nextChar()) {
				case TOKENS.HEADING:
					if (this.wrapHeading()) continue
			}

			this.reduceSource(' ')
		}
	}

	private nextChar (): Char {
		return this.source[this.index]
	}

	private nextToken (pattern: Pattern): Token {
		const nextToken = this.source.match(pattern)

		return nextToken || UNMATCHED // for nonstop parsing
	}

	private resetIndex () {
		this.index = 0
	}

	private pushResult (result: any) {
		this.result.push(result)
	}

	private reduceSource (token: Token) {
		this.source = this.source.substr(token.length)
		this.resetIndex()
	}

	private wrapHeading () {
		const {
			0: matchAll,
			1: headingLevel,
			2: match
		} = this.nextToken(PATTERNS.HEADING)

		if (!matchAll) return FAIL

		this.reduceSource(matchAll)
		this.pushResult({
			type: `heading${ headingLevel.length }`,
			token: match
		})

		return SUCCESS
	}
}
