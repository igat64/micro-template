const micro = require('micro')
const wrapAjvValidation = require('../wrap-ajv-validation')

jest.spyOn(micro, 'sendError').mockImplementation(() => {})

describe.only('wrap-ajv-validation', () => {
  test('default options', async () => {
    const schema = { type: 'number' }
    const wrap = wrapAjvValidation(schema)

    const handler = jest.fn()
    const wrappedHandler = wrap(handler)

    // success path
    await wrappedHandler({ body: 42 }, {})
    expect(handler).toBeCalledWith({ body: 42 }, {})

    handler.mockClear()

    // error path
    await wrappedHandler({ body: '42' }, {})
    expect(handler).not.toBeCalled()
    expect(micro.sendError).toBeCalledWith(
      { body: '42' },
      {},
      micro.createError(400, 'Bad request'),
    )
  })

  test('option "target"', async () => {
    const schema = { type: 'number' }
    const options = { target: 'query.apiKey' }
    const wrap = wrapAjvValidation(schema, options)

    const handler = jest.fn()
    const wrappedHandler = wrap(handler)

    await wrappedHandler({ query: { apiKey: 42 }, body: {} }, {})
    expect(handler).toBeCalledWith({ query: { apiKey: 42 }, body: {} }, {})
  })

  test('option "createError"', async () => {
    const schema = { type: 'number' }
    const options = {
      createError: jest.fn(errors => {
        const [{ message }] = errors
        const err = new Error()
        err.message = `Request body ${message}`
        err.status = 403
        return err
      }),
    }
    const wrap = wrapAjvValidation(schema, options)

    const handler = jest.fn()
    const wrappedHandler = wrap(handler)

    await wrappedHandler({ body: '42' }, {})
    expect(handler).not.toBeCalled()
    expect(options.createError).toBeCalledWith([
      {
        dataPath: '',
        keyword: 'type',
        message: 'should be number',
        params: { type: 'number' },
        schemaPath: '#/type',
      },
    ])
    expect(micro.sendError).toBeCalledWith(
      { body: '42' },
      {},
      options.createError([{ message: 'should be number' }]),
    )
  })
})
