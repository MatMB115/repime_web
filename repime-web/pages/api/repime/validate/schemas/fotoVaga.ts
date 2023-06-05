import * as Yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(Yup);

export const fotoVagaSchema = Yup.object({
    id: Yup.number()
    .optional(),
    id_vaga: Yup.number()
    .optional(),
    foto: Yup.string()
    .optional()
});

export type FotoVaga = Yup.InferType<typeof fotoVagaSchema>;