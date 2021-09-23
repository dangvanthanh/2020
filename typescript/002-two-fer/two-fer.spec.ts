import { twoFer } from './two-fer'

describe('Two fer', () => {
  test('No name given', () => {
    const expected = 'One for you, one for me.'
    expect(twoFer()).toBe(expected)
  })

  test('Alice name given', () => {
    const expected = 'One for Alice, one for me.'
    expect(twoFer('Alice')).toBe(expected)
  })

  test('Bob name given', () => {
    const expected = 'One for Bob, one for me.'
    expect(twoFer('Bob')).toBe(expected)
  })
})
