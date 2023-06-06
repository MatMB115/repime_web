import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../../../../src/app/libs/prisma_db";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.body.id == null)
            throw Error("Inexistência do parametro id!")

        await prisma.residencia.delete({
            where: {
                id: req.body.id
            }
        });

        return res.status(200).json({
            "repime": {
                'cod_ret': 0,
                'msg_ret': "República foi deletada com sucesso!"
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

