import CONSTANT from './CONSTANT'
import Token from './Token'
import Lexer, { AST } from './Lexer'
import Flag from './Flag'

export type MarkDown = string
export type Char = string
export type Index = number
export type Pattern = RegExp

export default class Tokenise {
	private result: AST[] = []
	private token: Token
	private readonly lexer = new Lexer()
	private readonly flag = new Flag()

	public static init (source: MarkDown): AST[] {
		return new Tokenise(source).result
	}

	private constructor (source: MarkDown) {
		this.token = new Token(source)

		this.init()
	}

	private init (): void {
		let ast: AST

		while (!this.token.isEnd()) {
			const char = this.token.nextChar()

			if (this.flag.isFlagged(CONSTANT.LINE_CARRIAGE)) {
				this.flag.unflag(CONSTANT.LINE_CARRIAGE)

				switch (char) {
					case '#':
						ast = this.lexer[CONSTANT.HEADINGS](this.token)
						break
					case '+':
						ast = this.lexer[CONSTANT.ORDERED_LIST](this.token)
						break
					case '-':
						ast = this.lexer[CONSTANT.UNORDERED_LIST](this.token)
						break
					default:
						continue
				}

				if (ast) this.commit(ast)

				continue
			}

			switch (char) {
			case '\n':
				this.flag.flag(CONSTANT.LINE_CARRIAGE)
				ast = this.lexer[CONSTANT.LINE_CARRIAGE](this.token)
				if (ast) this.commit(ast)
				break
			default:
				this.token.removeUndefinedChar()
			}
		}
	}

	private commit (ast: AST): void {
		this.result.push(ast)
	}
}
