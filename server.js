import {fastify} from 'fastify'
import {DatabaseMemory} from './database-memory.js'

const server = fastify()

const database = new DatabaseMemory()

//CREAT
server.post('/videos', (request, reply) => {

    const { title, description, duration} = request.body

    database.create({
        title: title,
        description: description,
        duration, //Short Sintaxe - Quando o nome passado é iguaL ao que recebe
    })

    return reply.status(201).send() //Status de CRIADO COM SUCESSO
})

//READ
server.get('/videos', (request) => {

    const search = request.query.search

    const videos = database.list(search)

    return videos
})


//UPDATE
//Route Parameter - :id
server.put('/videos/:id', (request, reply) => {
    const videoId = request.params.id
    const { title, description, duration} = request.body

    database.update(videoId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send() //Status para uma resposta com sucesso vazia
})

//DELETE
server.delete('/videos/:id', (request, reply) => {

    const videoId = request.params.id

    database.delete(videoId)  
    
    return reply.status(204).send()
})

server.listen({
    port: 3333
})