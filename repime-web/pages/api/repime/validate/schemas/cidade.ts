import * as Yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(Yup);

export const cidadeSchema = Yup.object({
    id: Yup.number().optional(),
    nome: Yup.string()
    .required("Preencha o nome")
    .min(2, "O nome precisa de pelo menos 2 caracteres")
    .max(50, "O nome ter no máximo 50 caracteres"),
    pais: Yup.string()
    .optional()
    .min(2, "O nome precisa de pelo menos 2 caracteres")
    .max(50, "O nome ter no máximo 50 caracteres"),
    uf: Yup.string()
    .optional()
    .max(2, "O UF deve ter no máximo 2 caracteres")
});

export type Cidade = Yup.InferType<typeof cidadeSchema>;