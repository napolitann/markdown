import CONSTANT from './CONSTANT'
// import Source from './Source'
import Token from './Token'

export interface AST {
	type: string
	source?: string
	meta?: {
		level?: number
		label?: string
	}
}

export interface Match {
	0: string
	1: string
	2: string
}

export default class Lexer {
	[index: string]: any

	public readonly ['\n'] = this[CONSTANT.LINE_CARRIAGE]
	public readonly ['#'] = this[CONSTANT.HEADINGS]
	public readonly ['+'] = this[CONSTANT.ORDERED_LIST]
	public readonly ['-'] = this[CONSTANT.UNORDERED_LIST]

	public [CONSTANT.LINE_CARRIAGE] (token: Token): AST {
		token.removeUndefinedChar.call(token)

		return {
			type: CONSTANT.LINE_CARRIAGE
		}
	}

	public [CONSTANT.HEADINGS] (token: Token): AST | void {
		const {
			0: matchAll,
			1: level,
			2: text
		}: Match = token.find(/^(#{1,6}) (.+)(?=\n)?/my)

		const source = text.trim()

		if (!matchAll) return
		if (!source) return

		const ast = {
			type: CONSTANT.HEADINGS,
			source,
			meta: {
				level: level.length
			}
		}

		return ast
	}

	public [CONSTANT.ORDERED_LIST] (token: Token): AST | void {
		const {
			0: matchAll,
			1: label,
			2: text
		}: Match = token.find(/^\+(.{3}:)? (.+)(?=\n)?/my)

		const source = text.trim()

		if (!matchAll) return
		if (!source) return

		const ast: AST = {
			type: CONSTANT.ORDERED_LIST,
			source
		}

		if (!!label) {
			ast.meta = { label }
		}

		return ast
	}

	public [CONSTANT.UNORDERED_LIST] (token: Token): AST | void {
		const {
			0: matchAll,
			1: label,
			2: text
		}: Match = token.find(/^\-(.+:)? (.+)(?=\n)?/my)

		const source = text.trim()

		if (!matchAll) return
		if (!source) return

		const ast: AST = {
			type: CONSTANT.UNORDERED_LIST,
			source
		}

		if (!!label) {
			ast.meta = { label }
		}

		return ast
	}
}
