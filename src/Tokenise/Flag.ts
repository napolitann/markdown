export interface Flags {
	[index: string]: boolean
	LINE_CARRIAGE: boolean
}

export default class Flag {
	private flags: Flags = {
		LINE_CARRIAGE: true
	}

	public isFlagged (name: string): boolean {
		this.assert(name)
		return this.flags[name]
	}

	public flag (name: string) {
		this.assert(name)
		this.flags[name] = true
	}

	public unflag (name: string) {
		this.assert(name)
		this.flags[name] = false
	}

	private assert (name: string): void {
		const message = `${ name } is not in Flags`
		console.assert(this.flags.hasOwnProperty(name), message)
	}
}
