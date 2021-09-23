import { hello } from './hello-world'

describe('Hello World', () => {
  test('Hello world', () => {
    expect(hello()).toBe('Hello, World!')
  })
})
