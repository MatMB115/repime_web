import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../../../../src/app/libs/prisma_db";
import bcrypt from 'bcrypt';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        const body = req.body;

        const camposAtualizaveis = {};

        for (const campo in body) {
            if (body[campo] !== null && campo != "id_usuario") {
                if (campo === "senha")
                    body[campo] = bcrypt.hashSync(body[campo], 10);
                camposAtualizaveis[campo] = body[campo];
            }
        }

        const user = await prisma.user.update({
            data: camposAtualizaveis,
            where: {
                id: body.id_usuario
            }
        })


        return res.status(200).json({
            "repime": {
                'cod_ret': 0,
                'msg_ret': "Usuario(a) " + user.name + " foi atualizado(a) com sucesso!"
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

