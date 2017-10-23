import CONSTANT from './CONSTANT'
import Token from './Token'
import Lexer, { AST } from './Lexer'
import Flag from './Flag'

export type HTML = string
export type Char = string
export type Index = number
export type Pattern = RegExp

export default class Tokenise {
	private result: AST[] = []
	private token: Token
	private readonly lexer = new Lexer()
	private readonly flag = new Flag()
	
	public static init (source: HTML): any {
		return new Tokenise(source).result
	}

	private constructor (source: HTML) {
		this.token = new Token(source)

		this.init()
	}

	private init (): void {
		let ast: AST

		// let count = 0
		// let MAX = 20

		while (!this.token.isEnd()) {
			// if (count === MAX) {
			// 	return
			// } else {
			// 	console.log('------------------', count++)
			// }

			const char = this.token.nextChar()

			if (this.flag.isFlagged(CONSTANT.LINE_CARRIAGE)) {
				this.flag.unflag(CONSTANT.LINE_CARRIAGE)

				switch (char) {
					case '#':
						ast = this.lexer[CONSTANT.HEADINGS](this.token)
						if (ast) this.commit(ast)
						break
					case '+':
						ast = this.lexer[CONSTANT.ORDERED_LIST](this.token)
						if (ast) this.commit(ast)
						break
					case '-':
						ast = this.lexer[CONSTANT.UNORDERED_LIST](this.token)
						if (ast) this.commit(ast)
						break
				}

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
