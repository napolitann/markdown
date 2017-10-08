export interface TokenOptions {
	text: string
	name: string
	pattern: RegExp
}

export interface TOKENS {
	[index: string]: TokenOptions
}

const HEADING = 'HEADING'
const ORDERED_LIST = 'ORDERED_LIST'
const UNORDERED_LIST = 'UNORDERED_LIST'

export const TOKENS: TOKENS = {
	[HEADING]: {
		text: '#',
		name: HEADING,
		pattern: /^(#{1,6}) +(.*\S)/
	},
	[ORDERED_LIST]: {
		text: '+',
		name: ORDERED_LIST,
		pattern: /^\+ +(.*\S)/
	},
	[UNORDERED_LIST]: {
		text: '-',
		name: UNORDERED_LIST,
		pattern: /^\- +(.*\S)/
	}
}
