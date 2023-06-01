import * as Yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(Yup);

export const vagaSchema = Yup.object({
    id: Yup.number()
    .optional(),
    mensalidade: Yup.number()
    .optional(),
    informacoes_adicionais: Yup.string()
    .optional()
    .max(100, "Informações adicionais estão grandes de mais"),
    id_residencia: Yup.number()
    .optional()
});

export type Vaga = Yup.InferType<typeof vagaSchema>;