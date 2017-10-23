import Tokenise from './Tokenise'

export type MarkDown = string
export type HTML = string

export default class {
	public static toHTML (source: MarkDown): HTML {
		const AST = Tokenise.init(source)

		return JSON.stringify(AST)
	}
}
