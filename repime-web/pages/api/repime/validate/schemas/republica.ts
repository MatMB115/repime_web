import * as Yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(Yup);

export const republicaSchema = Yup.object({
    id: Yup.number()
    .optional(),
    fundacao: Yup.string()
    .optional()
    .max(50, "O tamanho da Fundacao é maior do q deveria"),
    tem_trote: Yup.boolean()
    .optional(),
    e_masculina: Yup.boolean()
    .optional(),
    id_residencia: Yup.number()
    .optional()
});

export type Republica = Yup.InferType<typeof republicaSchema>;