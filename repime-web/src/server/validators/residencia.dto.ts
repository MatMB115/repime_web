import { z } from "zod";

import {
  instagram,
  optionalPositiveInt,
  optionalText,
  positiveInt,
  requiredText,
} from "./common";

const booleanField = z.preprocess(
  (value) => (value === undefined || value === null ? false : value),
  z.boolean()
);

const nullableDate = z.preprocess(
  (value) => (value === "" || value === null || value === undefined ? undefined : value),
  z.coerce.date().optional()
);

const residencePayload = z.object({
  id: positiveInt.optional(),
  nome: requiredText(50),
  descricao: optionalText(4000),
  tem_garagem: booleanField,
  tipo: z.enum(["República", "Kitnets"]),
  end_numero: positiveInt,
  end_rua: requiredText(75),
  end_bairro: requiredText(75),
  end_complemento: requiredText(75),
  end_cep: z.string().trim().regex(/^\d{8}$/, "CEP deve ter 8 dígitos"),
  tem_animais: booleanField,
  oferece_almoco: booleanField,
  oferece_janta: booleanField,
  fundacao: nullableDate,
  tem_trote: booleanField,
  tem_diarista: booleanField,
  tempo_de_contrato: optionalPositiveInt,
  tempo_unifei: optionalPositiveInt,
  tempo_centro: optionalPositiveInt,
  internet_mbps: optionalPositiveInt,
  instagram,
  agua_inclusa: booleanField,
  internet_inclusa: booleanField,
  energia_inclusa: booleanField,
});

const cityPayload = z.object({
  value: positiveInt,
  label: z.string().optional(),
});

const republicaPayload = z
  .object({
    tipo: z
      .object({
        value: z.enum(["Masculina", "Feminina", "Mista"]),
        label: z.string().optional(),
      })
      .nullable()
      .optional(),
  })
  .optional();

export const createResidenciaSchema = z.object({
  cidade: cityPayload,
  residencia: residencePayload.omit({ id: true }),
  republica: republicaPayload,
});

export const updateResidenciaSchema = z.object({
  cidade: cityPayload,
  residencia: residencePayload.extend({
    id: positiveInt,
  }),
  republica: republicaPayload,
});

export const removeResidenciaSchema = z.object({
  id: positiveInt,
});

export const getResidenceUserSchema = z.object({
  id_usuario: z.string().min(1),
});

export type CreateResidenciaInput = z.infer<typeof createResidenciaSchema>;
export type UpdateResidenciaInput = z.infer<typeof updateResidenciaSchema>;
