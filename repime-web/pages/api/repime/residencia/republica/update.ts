import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../../../../../src/app/libs/prisma_db";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        const body = req.body;

        const camposAtualizaveis = {};

        for (const campo in body) {
            if (body[campo] !== null && campo != "id" && campo != "id_residencia") {
                camposAtualizaveis[campo] = body[campo];
            }
        }

        const republica = await prisma.republica.update({
            data: camposAtualizaveis,
            where: {
                id: body.id
            }
        })


        return res.status(200).json({
            "repime": {
                'cod_ret': 0,
                'msg_ret': "A República foi atualizado(a) com sucesso!"
            }
        });
    } catch (e) {
        return res.status(500).json({
            "repime": {
                'cod_ret': 1,
                'msg_ret': (e as Error).message
            }
        });
    }
}