import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../../../../../src/app/libs/prisma_db";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
         const vaga = await prisma.vaga.create({
            data: {
                mensalidade: Number(req.body.mensalidade),
                informacoes_adicionais: req.body.informacoes_adicionais,
                tb_residencia: {
                    connect: {
                        id: Number(req.body.tb_residencia.id)
                    }
                }
            }
        });

        await prisma.fotoVaga.create({
            data: {
                foto: req.body.fotoVaga.foto,
                tb_vaga: {
                    connect: {
                        id: Number(vaga.id)
                    }
                }
            }
        });

        return res.status(200).json({
            "repime": {
                "cod_ret": 0,
                "msg_ret": "A vaga foi criada com sucesso!"
            }
        });

    } catch (error) {
        return res.status(500).json({
            "repime": {
                "cod_ret": 1,
                "msg_ret": (error as Error).message
            }
        });
    }
}
