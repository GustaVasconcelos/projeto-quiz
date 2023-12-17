import styles from '../styles/Resposta.module.css'
import RespostaModelo from "../model/resposta"
import { useEffect } from 'react'

interface RespostaProps {
    valor: RespostaModelo,
    indice: number,
    letra: string,
    corFundoLetra: string,
    respostaFornecida: (indice: number) => void
}
const Resposta = (props: RespostaProps) => {
    const resposta = props.valor

    const respostaRevelada = resposta.revelada ? styles.respostaRevelada : ''

    useEffect(() => {
        console.log(respostaRevelada)
    },[])

    const verificarResultado = () => {
        if (resposta.certa) {
            return (
                <div className={styles.certa}>
                    <div>
                        A resposta certa é ...
                    </div>
                    <div className={styles.valor}>
                        {resposta.valor}
                    </div>
                </div>
            )
        }

        return (
            <div className={styles.errada}>
                <div>
                    A resposta informada está errada...
                </div>
                <div className={styles.valor}>
                    {resposta.valor}
                </div>
            </div>
        )
    }
    
    return (
        <div onClick={() => props.respostaFornecida(props.indice)} className={styles.resposta}>
            <div className={`${styles.conteudoResposta} ${respostaRevelada}`}>
                <div className={styles.frente}>
                    <div className={styles.letra} style={{backgroundColor: props.corFundoLetra}}>
                        {props.letra}
                    </div>  
                    <div className={styles.valor}>
                        {resposta.valor}
                    </div>
                </div>
                <div className={styles.verso}>
                    {verificarResultado()}
                </div>
            </div>
        </div>
    )
}


export default Resposta