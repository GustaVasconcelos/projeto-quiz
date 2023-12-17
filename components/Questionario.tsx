import styles from '../styles/Questionario.module.css'
import QuestaoModelo from "../model/questao"
import Questao from './Questao'
import Botao from './Botao'

interface QuestionarioProps {
    questao: QuestaoModelo
    ultima: boolean,
    questaoRespondida: (questao: QuestaoModelo) => void
    irPraProximoPasso: () => void
}

const Questionario = (props: QuestionarioProps) => {

    const respostaFornecida = (indice: number) => {
        if (props.questao.naoRespondida) {
            props.questaoRespondida(props.questao.responderCom(indice))
        }
    }

    const renderizarQuestao = () => {
        if (props.questao) {
            return (
                <Questao
                valor={props.questao}
                respostaFornecida={respostaFornecida}
                tempoEsgotado={props.irPraProximoPasso}
                />
            )
        }

        return false
    }

    return (
        <div className={styles.questionario}>
            {renderizarQuestao()}

            <Botao
                onClick={props.irPraProximoPasso}
                texto={props.ultima ? 'Finalizar' : 'Próxima'}
            />
        </div>
    )
}

export default Questionario