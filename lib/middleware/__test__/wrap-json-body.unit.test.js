jest.mock('micro')

const micro = require('micro')
const wrapJsonBody = require('../wrap-json-body')

micro.json.mockImplementation(() => Promise.resolve({ valid: 'json' }))

describe('wrap-json-body', () => {
  test('returns a new handler (wrapper)', () => {
    expect(wrapJsonBody()).toBeInstanceOf(Function)
  })

  test('the middleware wrapper internally call micro.json()', async () => {
    const options = { limit: '2mb', encoding: 'koi-8' }
    const wrapper = wrapJsonBody(jest.fn(), options)

    const req = { body: '{"valid": "json"}' }
    await wrapper(req, {})

    expect(micro.json).toBeCalledWith(req, options)
  })

  test('the middleware wrapper internally call micro.json() with default options', async () => {
    const wrapper = wrapJsonBody(jest.fn())

    const req = { body: '{"valid": "json"}' }
    await wrapper(req, {})

    expect(micro.json).toBeCalledWith(req, { limit: '1mb', encoding: 'utf-8' })
  })

  test('the middleware wrapper call the passed handler and return its result', async () => {
    const handler = jest.fn()
    const wrapper = wrapJsonBody(handler)

    await wrapper({ body: '{"valid": "json"}' }, {})

    expect(handler).toBeCalledWith({ body: { valid: 'json' } }, {})
  })
})
