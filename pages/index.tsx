
import QuestaoModelo from '../model/questao'
import RespostaModelo from '../model/resposta'
import { useEffect, useState } from 'react'
import Questionario from '../components/Questionario'
import { useRouter } from 'next/router'

const BASE_URL = 'https://projeto-quiz-gold.vercel.app/'

export default function Home() {
    const router = useRouter()
    const [idsDasQuestoes, setIdsDasQuestoes] = useState<number[]>([])

    const [questao, setQuestao] = useState<QuestaoModelo>();

    const [respostasCertas, setRespostasCertas] = useState<number>(0);

    const carregarIdsQuestoes = async () => {
        const res = await fetch(`${BASE_URL}/questionario`)

        const idsDasQuestoes = await res.json()

        setIdsDasQuestoes(idsDasQuestoes)
    }

    const carregarQuestao = async (idQuestao: number) => {
        const res = await fetch(`${BASE_URL}/questoes/${idQuestao}`)

        const json = await res.json()

        const novaQuestao = QuestaoModelo.criarUsandoObjeto(json)
        
        setQuestao(novaQuestao)
    }

    const questaoRespondida = (questaoRespondida: QuestaoModelo) => {
        setQuestao(questaoRespondida)

        const acertou = questaoRespondida.acertou
        
        setRespostasCertas(respostasCertas + (acertou ? 1 : 0))
    }
    
    const idPraProximaPergunta = () => {
        const proximoIndice = idsDasQuestoes.indexOf(questao!.id) + 1

        return idsDasQuestoes[proximoIndice]
    }

    const irPraProximoPasso = () => {
        const proximoId = idPraProximaPergunta()

        proximoId ? irPraProximaQuestao(proximoId) : finalizar()
    }

    const irPraProximaQuestao = (proximoId: number) => {
        carregarQuestao(proximoId)
    }

    const finalizar = () => {
        router.push({
            pathname: "/resultado",
            query: {
                total: idsDasQuestoes.length,
                certas: respostasCertas
            }
        })
    }

    const renderizarQuestionario = () => {
        if (questao) {
            return (
                <Questionario 
                    questao={questao}
                    ultima={idPraProximaPergunta() === undefined}
                    questaoRespondida={questaoRespondida}
                    irPraProximoPasso={irPraProximoPasso}
                />
            )
        }

        return false
    }

    useEffect(() => {
        carregarIdsQuestoes()
    }, [])

    useEffect(() => {
        idsDasQuestoes.length > 0 && carregarQuestao(idsDasQuestoes[0])
    }, [idsDasQuestoes])

    return (
        <div style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'column',
            height:'100vh'
        }}>
            {renderizarQuestionario()}
        </div>
    )
}
