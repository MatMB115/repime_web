import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../../../../src/app/libs/prisma_db";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        if (req.query.id_usuario == null)
            throw Error("Inexistência do parametro usuario!")

        return res.status(200).json({
            "repime": {
                'cod_ret': 0,
                'msg_ret': "Sucesso",
                'result': {
                    "residencias": await prisma.residencia.findMany({
                        include: {
                            tb_vaga: true,
                        },
                        where: {
                            id_user: String(req.query.id_usuario),
                        }
                    })
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

