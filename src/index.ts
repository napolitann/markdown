import Render from './Render'
import { MarkDown, HTML } from './types'
import example from './__example'

export default class Napolitann {
	/**
	 * markdown example
	 */
	static readonly example: MarkDown = example

	/**
	 * render markdown to html
	 */
	static render (source: MarkDown): HTML {
		return Render.toHTML(source)
	}
}
