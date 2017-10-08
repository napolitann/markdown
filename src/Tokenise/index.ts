import { MarkDown, Tokens } from '../types'
import { TOKENS, TokenOptions } from './TOKENS'
import Token from './Token'
import Wrap from './Wrap'

export type Char = string
export type Index = number
export type Pattern = RegExp

// const SUCCESS = true
const FAIL = false

let token: Token

export default class Tokenise {
	private result: Tokens = []
	private isSuccess: boolean

	static init (source: MarkDown): Tokens | any {
		return (new Tokenise(source)).result
	}

	private constructor (source: MarkDown) {
		token = new Token(source)

		this.init()
	}

	private init (): void {
		let countToPreventLoop = 0
		const LOOP_LIMIT = 20

		while (token.isEnd()) {
			if (++countToPreventLoop > LOOP_LIMIT) {
				return console.error('over clock')
			}

			switch (token.nextChar()) {
				case TOKENS.HEADING.text:
					this.commit(TOKENS.HEADING); break
				case TOKENS.ORDERED_LIST.text:
					this.commit(TOKENS.ORDERED_LIST); break
				case TOKENS.UNORDERED_LIST.text:
					this.commit(TOKENS.UNORDERED_LIST); break
				default:
					this.isSuccess = FAIL
			}

			if (this.checkSuccess()) continue

			token.remove(' ')
		}
	}

	private commit (tokenOptions: TokenOptions): void {
		const nextToken = token.next(tokenOptions.pattern)
		const wrapper = Wrap[tokenOptions.name]
		const isSuccess = wrapper(nextToken, (match: string | RegExpMatchArray, result: any): void => {
			return this.commitResult(match, result)
		})

		this.isSuccess = isSuccess
	}

	private checkSuccess (): boolean {
		return this.isSuccess
	}

	private commitResult (match: string | RegExpMatchArray, result: any): void {
		token.remove(match)
		this.pushResult(result)
	}

	private pushResult (result: any): void {
		this.result.push(result)
	}
}
