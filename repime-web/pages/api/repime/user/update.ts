import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../../../../src/app/libs/prisma_db";
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const user = await prisma.user.update({
            data: {
                name: req.body.nome,
                senha: req.body.senha == null || req.body.senha == "" ? null : bcrypt.hashSync(req.body.senha, 10),
                contato: req.body.contato,
                image: req.body.foto
            },
            where: {
                id: req.body.id
            }
        });

        return res.status(200).json({
            "repime": {
                'cod_ret': 0,
                'msg_ret': "Usuário atualizado com sucesso!"
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

