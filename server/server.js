'use strict'
const Hapi = require('hapi')
const fields = require('./resources/fields.json')

const getFieldsHandler = (_req, resp) => {
  console.info('GET /fields')
  return resp(fields)
}

const server = new Hapi.Server({
  connections: {
    routes: {
      cors: true,
    }
  }
})

server.connection({
  host: 'localhost',
  port: 8001,
})

server.route({
  method: 'GET',
  path: '/fields',
  handler: getFieldsHandler
})

server.start((err) => {
  if (err) { throw err }
  console.info(`Server running at: ${server.info.uri}`)
})
