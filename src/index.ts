import Render from './Render'
import example from './__example'

export type MarkDown = string
export type HTML = string

export default class {
	/**
	 * markdown example
	 */
	public static readonly example: MarkDown = example

	/**
	 * render markdown to html
	 */
	public static render (source: MarkDown): HTML {
		return Render.toHTML(source)
	}
}
