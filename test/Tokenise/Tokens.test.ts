import Token from '../../src/Tokenise/Token'

describe('Token', () => {
  let token: Token

  it('initialise', () => {
    token = new Token('## Markdown Tokenise Message')

    expect(token.isEnd()).toBe(false)
  })

  it('search next string', () => {
    expect(token.nextToc()).toEqual('##')
  })
})
