export type MarkDown = string

export default class Source {
	public static init (source: MarkDown): MarkDown {
		return new Source(source).source
	}

	private constructor (private source: MarkDown) {
		this
			.reduceLineCarriage()
			.removeTab()
		}

	private reduceLineCarriage (): this {
		this.source = this.source.replace(/[\r\n]+/g, '\n')

		return this
	}

	private removeTab (): this {
		this.source = this.source.replace(/\t+/, '')

		return this
	}
}
