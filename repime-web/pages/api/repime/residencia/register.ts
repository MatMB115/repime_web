import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../../../../src/app/libs/prisma_db";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        const residencia = await prisma.residencia.create({
            data: {
                nome: req.body.residencia.nome,
                tem_garagem: req.body.residencia.tem_garagem,
                tipo: req.body.residencia.tipo,
                tem_diarista: req.body.residencia.tem_diarista,
                tem_animais: req.body.residencia.tem_animais,
                oferece_almoco: req.body.residencia.oferece_almoco,
                oferece_janta: req.body.residencia.oferece_janta,
                tem_trote: req.body.residencia.tem_trote,
                fundacao: req.body.residencia.fundacao,
                tempo_de_contrato: req.body.residencia.tempo_de_contrato,
                agua_inclusa: req.body.residencia.agua_inclusa,
                internet_inclusa: req.body.residencia.internet_inclusa,
                energia_inclusa: req.body.residencia.energia_inclusa,
                end_numero: Number(req.body.endereco.end_numero),
                end_rua: req.body.endereco.end_rua,
                end_bairro: req.body.endereco.end_bairro,
                end_complemento: req.body.endereco.end_complemento,
                end_cep: req.body.endereco.end_cep,
                tb_cidade: {
                    connect: {
                        id: Number(req.body.cidade.value)
                    }
                },
                tb_usuario: {
                    connect: {
                        id: req.body.usuario.id_usuario
                    }
                }
            }
        });

        return res.status(200).json({
            "repime": {
                "cod_ret": 0,
                "msg_ret": "A residência " + residencia.nome + " foi criada com sucesso!"
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


