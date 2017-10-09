import Tokenise from '../../src/Tokenise'

describe('rendering', () => {
  it('heading', () => {
    for (let level = 1; level <= 6; level += 1) {
      const result = Tokenise.init(`${ '#'.repeat(level) } heading`)
      const AST = [{
        type: 'HEADING',
        token: 'heading',
        depth: 0,
        option: {
          level
        }
      }]

      expect(result).toEqual(AST)
    }
  })

  it('ordered list', () => {
    const result = Tokenise.init('+ list')
    const AST = [{
      type: 'ORDERED_LIST',
      token: 'list',
      depth: 0
    }]

    expect(result).toEqual(AST)
  })

  it('unordered list', () => {
    const result = Tokenise.init('- list')
    const AST = [{
      type: 'UNORDERED_LIST',
      token: 'list',
      depth: 0
    }]

    expect(result).toEqual(AST)
  })
})
