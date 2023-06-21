import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../../../../src/app/libs/prisma_db";
import { tipos_residencia, tipos_rep} from "@prisma/client"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        const residenceBodyType = req.body.residencia.tipo;
        const repBodyType = req.body.republica?.tipo?.value;
        const repBodyFundation = req.body.residencia.fundacao;
        const kitnetBodyContract = req.body.residencia.tempo_de_contrato;
        let residenceType, repType, repFundation, kitnetContract, fieldsToNull;

        if(residenceBodyType == 'República') {
            residenceType = tipos_residencia.republica;
            repFundation = new Date(repBodyFundation);
            kitnetContract = null;

            fieldsToNull = ['agua_inclusa', 'internet_inclusa', 'energia_inclusa'];
            
            if (repBodyType === 'Masculina') {
                repType = tipos_rep.masculina;
            }
            else if (repBodyType === 'Feminina') {
                repType = tipos_rep.feminina;
            }
            else {
                repType = tipos_rep.mista;
            }
        }
        else {
            residenceType = tipos_residencia.kitnet;
            kitnetContract = Number(kitnetBodyContract);

            fieldsToNull =  ['fundacao', 'tem_diarista', 'tem_animais', 'oferece_almoco', 'oferece_janta', 'tem_trote']
            repType = null;
        }

        for (const field of fieldsToNull) {
            req.body.residencia[field] = null;
        }    

        const residencia = await prisma.residencia.create({
            data: {
                nome: req.body.residencia.nome,
                tem_garagem: req.body.residencia.tem_garagem,
                tipo: residenceType,
                tipo_republica: repType,
                tem_diarista: req.body.residencia.tem_diarista,
                tem_animais: req.body.residencia.tem_animais,
                oferece_almoco: req.body.residencia.oferece_almoco,
                oferece_janta: req.body.residencia.oferece_janta,
                tem_trote: req.body.residencia.tem_trote,
                fundacao: repFundation,
                tempo_de_contrato: kitnetContract,
                agua_inclusa: req.body.residencia.agua_inclusa,
                internet_inclusa: req.body.residencia.internet_inclusa,
                energia_inclusa: req.body.residencia.energia_inclusa,
                end_numero: Number(req.body.residencia.end_numero),
                end_rua: req.body.residencia.end_rua,
                end_bairro: req.body.residencia.end_bairro,
                end_complemento: req.body.residencia.end_complemento,
                end_cep: req.body.residencia.end_cep,
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