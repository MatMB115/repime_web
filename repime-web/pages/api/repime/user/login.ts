import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../../../../src/app/libs/prisma_db";
import bcrypt from 'bcrypt';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const user = (await prisma.tb_usuario.findFirst({
            where: {
                email: req.body.email
            }
        },
        ));

        if (user == null) throw Error("Usuário não foi encontrado.");

        const match = await bcrypt.compare(req.body.senha, user.senha);

        if (!match) throw Error("Senha incorreta");

        return res.status(200).json({
            "repime": {
                'cod_ret': 0,
                'msg_ret': "Login efetuado com sucesso!",
                'result': {
                    'user': {
                        id: user.id,
                        nome: user.nome,
                        foto: user.foto,
                        email: user.email,
                        contato: user.contato,
                    }
                }
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

