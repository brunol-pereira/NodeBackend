// import { setServers } from 'node:dns'
// import { createServer} from 'node:http'


// //Criar servidor
// const server = createServer((request, response) => {
//     response.write('hello')
//     return response.end()
// })

// server.listen(3333)

import {fastify} from 'fastify'

const server = fastify()

server.get('/', () => {
    return 'Hello World'
})

server.get('/node', () => {
    return 'Hello Node'
})

server.listen({
    port: 3333
})