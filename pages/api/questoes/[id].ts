/* eslint-disable import/no-anonymous-default-export */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import questoes from '../bancoDeQuestoes';

export default (req: NextApiRequest, res: NextApiResponse) => {
    const idSelecionado = +req.query.id

    const unicaQuestaoOuNada = questoes.filter(questao => questao.id === idSelecionado)

    if (unicaQuestaoOuNada.length === 1 ) {
        const questaoSelecionada = unicaQuestaoOuNada[0].embaralharRespostas()

        return res.status(200).json(questaoSelecionada.converterParaObjeto());
    }

    return res.status(204).send();
}