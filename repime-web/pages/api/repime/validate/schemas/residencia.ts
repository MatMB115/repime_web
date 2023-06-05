import * as Yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(Yup);

export const residenciaSchema = Yup.object({
    id: Yup.number().optional(),
    nome: Yup.string()
    .required("Preencha o nome")
    .min(2, "O nome precisa de pelo menos 2 caracteres")
    .max(50, "O nome ter no máximo 50 caracteres"),
    e_mobiliado: Yup.boolean().optional(),
    tem_garagem: Yup.boolean().optional(),
    tem_empregada: Yup.boolean().optional(),
    tem_animais: Yup.boolean().optional(),
    oferece_almoco: Yup.boolean().optional(),
    oferece_janta: Yup.boolean().optional(),
    end_numero: Yup.number().optional(),
    end_rua: Yup.string().optional().max(75,"end_ru deve ter no max 75 caracteres"),
    end_bairro: Yup.string().optional().max(75, "end_bairro deve ter no max 75 caracteres"),
    end_complemento: Yup.string().optional().max(75, "end_complemento deve ter no max 75 caracteres"), 
    end_cep: Yup.string().optional().max(8, "end_cep deve ter no max 8 caracteres"),
    id_cidade: Yup.number().optional(),
    id_user: Yup.string().optional()
});

export type Residencia = Yup.InferType<typeof residenciaSchema>;