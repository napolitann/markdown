export interface TokenOptions {
	text: string
	name: string
	pattern: RegExp
}

export interface TOKENS {
	HEADING: TokenOptions
	ORDERED_LIST: TokenOptions
	UNORDERED_LIST: TokenOptions
}

export const TOKENS: TOKENS = {
	HEADING: {
		text: '#',
		name: 'HEADING',
		pattern: /^(#{1,6}) +(.*\S)/
	},
	ORDERED_LIST: {
		text: '+',
		name: 'ORDERED_LIST',
		pattern: /^\+ +(.*\S)/
	},
	UNORDERED_LIST: {
		text: '-',
		name: 'UNORDERED_LIST',
		pattern: /^\- +(.*\S)/
	}
}
