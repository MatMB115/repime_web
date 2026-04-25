import { z } from "zod";

import { contactPhone, optionalText, requiredText, strongPassword } from "./common";

export const createUserSchema = z.object({
  nome: requiredText(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  senha: strongPassword,
  contato: contactPhone,
  nome_contato: optionalText(100),
});

export const updateUserSchema = z.object({
  id: z.string().min(1).optional(),
  nome: requiredText(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  senha: z.preprocess(
    (value) => (value === "" || value === null ? undefined : value),
    strongPassword.optional()
  ),
  contato: contactPhone,
  nome_contato: optionalText(100),
  foto: z.preprocess(
    (value) => (value === "" || value === null ? undefined : value),
    z.string().url().max(2048).optional()
  ),
});

export const removeUserSchema = z.object({
  id_usuario: z.string().min(1).optional(),
});

export const loginUserSchema = z.object({
  email: z.string().trim().email("E-mail inválido").max(255),
  senha: z.string().min(1, "Senha é obrigatória").max(128),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
