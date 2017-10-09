import { MarkDown, Tokens, HTML } from './types'
import Tokenise from './Tokenise'

export default class {
	static toHTML (source: MarkDown): HTML {
		const tokens: Tokens | any = Tokenise.init(source)

		return JSON.stringify(tokens)
	}
}
