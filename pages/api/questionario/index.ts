/* eslint-disable import/no-anonymous-default-export */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import questoes from '../bancoDeQuestoes';
import embaralhar from '../../../functions/arrays';

export default (req: NextApiRequest, res: NextApiResponse) => {
    const ids = questoes.map(questao => questao.id)

    res.status(200).json(embaralhar(ids))
}