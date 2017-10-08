import { Token } from '../types'
import { TOKENS } from './TOKENS'

export type Type = string
export type Depth = number
export type Option = any

export interface Result {
	type: Type
	token: Token
	depth: Depth
	option?: Option
}

const FAIL = false
const SUCCESS = true

const Wrap = {
	[TOKENS.HEADING.name] (
		source: Token,
		commit: (match: Token, result: Result) => void
	): boolean {
		const {
			0: match,
			1: depth,
			2: token
		} = source

		if (!match) return FAIL

		const result: Result = {
			type: TOKENS.HEADING.name,
			token,
			depth: 0,
			option: {
				level: depth.length
			}
		}

		commit(match, result)

		return SUCCESS
	},

	[TOKENS.ORDERED_LIST.name] (
		source: Token,
		commit: (match: Token, result: Result) => void
	): boolean {
		const {
			0: match,
			1: token
		} = source

		if (!match) return FAIL

		const result: Result = {
			type: TOKENS.ORDERED_LIST.name,
			token,
			depth: 0
		}

		commit(match, result)

		return SUCCESS
	},

	[TOKENS.UNORDERED_LIST.name] (
		source: Token,
		commit: (match: Token, result: Result) => void
	): boolean {
		const {
			0: match,
			1: token
		} = source

		if (!match) return FAIL

		const result: Result = {
			type: TOKENS.UNORDERED_LIST.name,
			token,
			depth: 0
		}

		commit(match, result)

		return SUCCESS
	}
}

export default Wrap
