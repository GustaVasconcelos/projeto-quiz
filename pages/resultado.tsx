import Estatistica from '../components/Estatistica';
import styles from '../styles/Resultado.module.css';
import { useRouter } from "next/router"
import Botao from '../components/Botao';

const Resultado = () => {
    const router = useRouter()

    const total = +router.query.total!
    const certas = +router.query.certas!
    const percentual = Math.round((certas / total) * 100)
    return (
        <div className={styles.resultado}>
            <h1>Resultado Final</h1>
            <div style={{ display:'flex'}}>
                <Estatistica
                    texto='Perguntas'
                    valor={total}
                />
                <Estatistica
                    corFundo='#9CD2A4'
                    texto='Certas'
                    valor={certas}
                />
                <Estatistica
                    corFundo='#DE6A33'
                    texto='Percentual'
                    valor={`${percentual}%`}
                />
            </div>
            <Botao
                href='/'
                texto='Tentar novamente'
            />
        </div>
    )
}

export default Resultado