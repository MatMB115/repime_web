import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../../../../src/app/libs/prisma_db";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        const cidades = await prisma.cidade.findMany();
        return res.status(200).json({
            "repime": {
                'cod_ret': 1,
                'msg_ret': "Sucesso",
                'result': {
                    "cidades": cidades
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

