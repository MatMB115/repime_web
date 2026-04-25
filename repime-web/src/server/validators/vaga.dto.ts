import { z } from "zod";

import { optionalText, positiveInt } from "./common";

export const createVagaSchema = z.object({
  titulo: optionalText(200),
  mensalidade: z.coerce.number().positive(),
  descricao: optionalText(2000),
  e_mobiliado: z.preprocess(
    (value) => (value === undefined || value === null ? false : value),
    z.boolean()
  ),
  tb_residencia: positiveInt,
  fotoVaga: z.object({
    foto: z.string().max(2048).min(1, "A foto é obrigatória"),
  }),
});

export const removeVagaSchema = z.object({
  id: positiveInt,
});

export const updateVagaSchema = z.object({
  id: positiveInt,
  titulo: optionalText(200),
  mensalidade: z.coerce.number().positive().optional(),
  descricao: optionalText(2000),
  e_mobiliado: z.preprocess(
    (value) => (value === undefined || value === null ? undefined : value),
    z.boolean().optional()
  ),
});

export type CreateVagaInput = z.infer<typeof createVagaSchema>;
export type UpdateVagaInput = z.infer<typeof updateVagaSchema>;
