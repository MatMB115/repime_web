import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../../../../../src/app/libs/prisma_db";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        const residencia = await prisma.residencia.create({
            data: {
                nome: req.body.residencia.nome,
                e_mobiliado: req.body.residencia.e_mobiliado,
                tem_garagem: req.body.residencia.tem_garagem,
                tem_empregada: req.body.residencia.tem_empregada,
                tem_animais: req.body.residencia.tem_animais,
                oferece_almoco: req.body.residencia.oferece_almoco,
                oferece_janta: req.body.residencia.oferece_janta,
                end_numero: Number(req.body.endereco.end_numero),
                end_rua: req.body.endereco.end_rua,
                end_bairro: req.body.endereco.end_bairro,
                end_complemento: req.body.endereco.end_complemento,
                end_cep: req.body.endereco.end_cep,
                tb_cidade: {
                    connect: {
                        id: req.body.cidade.id_cidade
                    }
                },
                tb_usuario: {
                    connect: {
                        id: req.body.usuario.id_usuario
                    }
                }
            }
        });

        await prisma.kitnet.create({
            data: {
                tempo_de_contato: req.body.kitnet.tempo_de_contato,
                tb_residencia: {
                    connect: {
                        id: residencia.id
                    }
                }
            }
        });

        return res.status(200).json({
            "repime": {
                "cod_ret": 0,
                "msg_ret": "A kitnet " + residencia.nome + " foi criada com sucesso!"
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


