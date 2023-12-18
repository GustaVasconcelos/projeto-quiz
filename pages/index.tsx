
import QuestaoModelo from '../model/questao'
import axios from 'axios';
import { useEffect, useState } from 'react'
import Questionario from '../components/Questionario'
import { useRouter } from 'next/router'

const BASE_URL = 'https://projeto-quiz-gold.vercel.app/api'

export default function Home() {
    const router = useRouter()
    const [idsDasQuestoes, setIdsDasQuestoes] = useState<number[]>([])

    const [questao, setQuestao] = useState<QuestaoModelo>();

    const [respostasCertas, setRespostasCertas] = useState<number>(0);

    const carregarIdsQuestoes = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/questionario`);
            const idsDasQuestoes = res.data;
            setIdsDasQuestoes(idsDasQuestoes);
        } catch (error) {
            console.error('Erro ao carregar IDs das questões:', error);
        }
    }
    
    const carregarQuestao = async (idQuestao: number) => {
        try {
            const res = await axios.get(`${BASE_URL}/questoes/${idQuestao}`);
            const novaQuestao = QuestaoModelo.criarUsandoObjeto(res.data);
            setQuestao(novaQuestao);
        } catch (error) {
            console.error('Erro ao carregar a questão:', error);
        }
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
