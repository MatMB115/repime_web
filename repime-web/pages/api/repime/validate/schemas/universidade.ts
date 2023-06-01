import * as Yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(Yup);

export const universidadeSchema = Yup.object({
    id: Yup.number().optional(),
    id_cidade: Yup.number(),
    nome: Yup.string()
    .required("Preencha o nome")
    .min(2, "O nome precisa de pelo menos 2 caracteres")
    .max(50, "O nome ter no máximo 50 caracteres")
});

export type Universidade = Yup.InferType<typeof universidadeSchema>;