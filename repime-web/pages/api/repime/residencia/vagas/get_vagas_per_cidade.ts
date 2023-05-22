import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../../../../../src/app/libs/prisma_db";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        if (!req.query.id_cidade)
            throw Error("Inexistência do parametro id_cidade")

        const kitnet = await prisma.tb_vaga.findMany({
            select: {
                id: true,
                id_residencia: true,
                informacoes_adicionais: true,
                mensalidade: true,
                tb_foto_vaga: true,
                tb_residencia_endereco: true
            },
            where: {
                tb_residencia_endereco: {
                    id_cidade: Number(req.query.id_cidade),
                    tb_kitnet: {
                        some: {}
                    }
                }
            }
        });

        const republica = await prisma.tb_vaga.findMany({
            select: {
                id: true,
                id_residencia: true,
                informacoes_adicionais: true,
                mensalidade: true,
                tb_foto_vaga: true,
                tb_residencia_endereco: true
            },
            where: {
                tb_residencia_endereco: {
                    id_cidade: Number(req.query.id_cidade),
                    tb_republica: {
                        some: {}
                    }
                }
            }
        });

        return res.status(200).json({
            "repime": {
                'cod_ret': 0,
                'msg_ret': "Sucesso",
                'result': {
                    republica, kitnet
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

