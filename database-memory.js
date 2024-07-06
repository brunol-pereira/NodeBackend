import {randomUUID} from "node:crypto"

export class DatabaseMemory {
    #videos = new Map() // # - chave privada

    list(search) {

        //Array.from - Converte uma estrutura de dados para um Array
        return Array.from(this.#videos.entries())
        .map((videoArray) => {
            const id = videoArray[0]
            const data = videoArray[1]

            //Copiar os dados do antigo objeto para o novo
            return{
                id,
                ...data, //spread operator Js
            }
        })
        .filter(video => {
            if (search){
                return video.title.includes(search) //Retorna bool, se tiver em seu title a busca(search)
            }
            return true
        })
    }

    create(video) {
        const videoId = randomUUID()

        this.#videos.set(videoId, video)
    }

    update(id,video) {
        this.#videos.set(id, video)
    }

    delete(id) {
        this.#videos.delete(id)
    }
}