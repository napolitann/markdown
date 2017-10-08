import { MarkDown, Tokens, HTML } from './types'
import Tokenise from './Tokenise'

export default class Render {
	static toHTML (source: MarkDown): HTML {
		const tokens: Tokens | any = Tokenise.init(source)

		console.log(tokens)

		return JSON.stringify(tokens)
	}
}
