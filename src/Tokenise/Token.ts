import Source from './Source'

export type MarkDown = string
export type Char = string
export type Pattern = RegExp

export default class Token {
	private source: MarkDown
	private count: number
	private cursor = 0
	private readonly UNMATCHED: RegExpMatchArray = ['', '', '']

	public constructor (source: MarkDown) {
		this.source = Source.init(source)
		this.count = this.source.length
	}

	public isEnd (): boolean {
		return (this.count <= this.cursor)
	}

	public removeUndefinedChar (): void {
		this.cursor++
	}

	public nextChar (): Char {
		return this.source[this.cursor]
	}

	public find (pattern: Pattern): any {
		return this.next(pattern)
	}

	private next (pattern: Pattern): RegExpMatchArray | void {
		pattern.lastIndex = this.cursor

		const result = this.source.match(pattern) ||this.UNMATCHED

		if (pattern.lastIndex) {
			this.cursor = pattern.lastIndex++
		} else {
			this.removeUndefinedChar()
		}

		return result
	}
}
