import parser from './parser'

describe('parser', () => {
  test('should detect success', () => {
    const example = `
1..2
ok 1 - Should pass
ok 2 - Should also pass
`
    expect(parser(example)).toEqual({ ok: true })
  })
  test('should detect failure', () => {
    const example = `
1..3
ok 1 - Should pass
not ok 2 - This one fails
ok 3 - Also passes
`
    expect(parser(example).ok).toBe(false)
  })
  test('should return failure message', () => {
    const example = `
1..4
ok 1 - Should pass
not ok 2 - First to fail
ok 3 - Also passes
not ok 4 - Second to fail
`
    expect(parser(example).message).toBe('First to fail')
  })
})
