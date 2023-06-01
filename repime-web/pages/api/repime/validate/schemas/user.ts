import * as Yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(Yup);

const phoneNumber = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const usuarioSchema = Yup.object({
    name: Yup.string()
    .required("Preencha o nome")
    .min(2, "O nome precisa de pelo menos 2 caracteres")
    .max(20, "O nome ter no máximo 20 caracteres"),
    image: Yup.string().optional(),
    senha: Yup.string()
    .optional()
    .min(8, "A senha precisa de ter no min 8 caracteres")
    .minLowercase(1, "A senha precisa de ter no min um caracter minusculo")
    .minUppercase(1, "A senha precisa de ter no min um caracter maiusculo")
    .minNumbers(1, "A senha precisa de ter no min um número")
    .minSymbols(1, "A senha precisa de ter no min um simbolo"),
    email: Yup.string()
    .email("Isso não é um E-mail")
    .max(50, "O email tem que ter no max 50 caracteres"),
    contato: Yup.string()
    .required("Digite seu número")
    .matches(phoneNumber,"É necessário um número valido")
    .max(15,"Contato maior do que deveria"),
    is_administrador: Yup.boolean()
    .optional(),
    id: Yup.string().optional(),
    emailVerified: Yup.date().optional()
});

export type User = Yup.InferType<typeof usuarioSchema>;