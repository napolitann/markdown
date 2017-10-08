export interface TokenOptions {
	text: string
	name: string
	pattern: RegExp
}

const HEADING = 'HEADING'
const ORDERED_LIST = 'ORDERED_LIST'
const UNORDERED_LIST = 'UNORDERED_LIST'

class Tokens {
	[index: string]: TokenOptions

	readonly ['#'] = this[HEADING]
	get [HEADING] () {
		return {
			text: '#',
			name: HEADING,
			pattern: /^(#{1,6}) +(.*\S)/
		}
	}

	readonly ['+'] = this[ORDERED_LIST]
	get [ORDERED_LIST] () {
		return {
			text: '+',
			name: ORDERED_LIST,
			pattern: /^\+ +(.*\S)/
		}
	}

	readonly ['-'] = this[UNORDERED_LIST]
	get [UNORDERED_LIST] () {
		return {
			text: '-',
			name: UNORDERED_LIST,
			pattern: /^\- +(.*\S)/
		}
	}
}

export const TOKENS = new Tokens()
