import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../../../../src/app/libs/prisma_db";
import bcrypt from 'bcrypt';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        (await prisma.tb_usuario.create({
            data: {
                nome: req.body.nome,
                senha: bcrypt.hashSync(req.body.senha, 10),
                email: req.body.email,
                contato: req.body.contato,
                is_administrador: false
            }
        }));

        return res.status(200).json({
            "repime": {
                'cod_ret': 0,
                'msg_ret': "Usuário criado com sucesso!"
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

