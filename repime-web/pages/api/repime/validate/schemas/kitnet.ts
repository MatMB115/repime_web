import * as Yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(Yup);

export const kitnetSchema = Yup.object({
    id: Yup.number().optional(),
    tempo_de_contato: Yup.string()
    .optional()
    .max(10, "Tempo de contato tá grande de mais"),
    id_residencia: Yup.number()
    .optional()
});

export type Kitnet = Yup.InferType<typeof kitnetSchema>;