import embaralhar from "@/functions/arrays"
import RespostaModelo from "./resposta"

export default class QuestaoModelo {
    #id: number
    #enunciado: string
    #respostas: RespostaModelo[]
    #acertou: boolean

    constructor (
        id: number, 
        enunciado: string, 
        respostas: RespostaModelo[], 
        acertou = false
    ) {
        this.#id = id
        this.#enunciado = enunciado
        this.#respostas = respostas
        this.#acertou = acertou
    }

    get id() {
        return this.#id
    }

    get respostas() {
        return this.#respostas
    }

    get enunciado() {
        return this.#enunciado
    }

    get acertou() {
        return this.#acertou
    }

    get respondida() {
        for(let resposta of this.#respostas) {
            if (resposta.revelada) return true
        }

        return false
    }

    get naoRespondida() {
        return !this.respondida
    }

    responderCom(indice: number): QuestaoModelo {
        const acertou = this.#respostas[indice]?.certa
        const respostas = this.#respostas.map((resposta, i) => {
            const respotaSelecionada = indice === i

            const deveRevelar = respotaSelecionada || resposta.certa

            return deveRevelar ? resposta.revelar() : resposta
        })

        return new QuestaoModelo(this.id, this.enunciado, respostas, acertou);
    }

    embaralharRespostas() {
        let respostasEmbaralhadas = embaralhar(this.#respostas)

        return new QuestaoModelo(this.#id, this.#enunciado, respostasEmbaralhadas, this.#acertou)
    }

    static criarUsandoObjeto(obj: QuestaoModelo): QuestaoModelo {
        const respostas = obj.respostas.map(res => RespostaModelo.criarUsandoObjeto(res))

        return new QuestaoModelo(obj.id, obj.enunciado, respostas, obj.acertou)
    }

    converterParaObjeto() {
        return {
            id: this.#id,
            enunciado: this.#enunciado,
            respondida: this.respondida,
            acertou: this.#acertou,
            respostas: this.#respostas.map(res => res.converterParaObjeto())
        }
    }
}

