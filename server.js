import {fastify} from 'fastify'
// import {DatabaseMemory} from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

//const database = new DatabaseMemory()
const database = new DatabasePostgres()

//CREAT
server.post('/videos', async(request, reply) => {

    const { title, description, duration} = request.body

    await database.create({
        title: title,
        description: description,
        duration, //Short Sintaxe - Quando o nome passado é iguaL ao que recebe
    })

    return reply.status(201).send() //Status de CRIADO COM SUCESSO
})

//READ
server.get('/videos', async(request) => {

    const search = request.query.search

    const videos = await database.list(search)

    return videos
})


//UPDATE
//Route Parameter - :id
server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    const { title, description, duration} = request.body

    await database.update(videoId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send() //Status para uma resposta com sucesso vazia
})

//DELETE
server.delete('/videos/:id', async (request, reply) => {

    const videoId = request.params.id

    await database.delete(videoId)  
    
    return reply.status(204).send()
})

server.listen({
    port: process.env.PORT ?? 3333,
})