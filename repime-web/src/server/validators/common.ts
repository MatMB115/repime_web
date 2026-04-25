import { z } from "zod";

const emptyToUndefined = (value: unknown) => {
  if (value === "" || value === null || value === undefined) {
    return undefined;
  }

  return value;
};

export const requiredText = (max: number) =>
  z.string().trim().min(1, "Campo obrigatório").max(max).transform(stripHtml);

export const optionalText = (max: number) =>
  z.preprocess(
    emptyToUndefined,
    z.string().trim().max(max).transform(stripHtml).optional()
  );

export const optionalPositiveInt = z.preprocess(
  emptyToUndefined,
  z.coerce.number().int().positive().optional()
);

export const positiveInt = z.coerce.number().int().positive();

export const contactPhone = z
  .string()
  .trim()
  .min(10)
  .max(15)
  .regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, "Contato inválido");

export const strongPassword = z
  .string()
  .min(8)
  .max(128)
  .regex(/[a-z]/, "A senha precisa ter uma letra minúscula")
  .regex(/[A-Z]/, "A senha precisa ter uma letra maiúscula")
  .regex(/\d/, "A senha precisa ter um número")
  .regex(/[^A-Za-z0-9]/, "A senha precisa ter um caractere especial");

export function stripHtml(value: string) {
  return value.replace(/[<>]/g, "").replace(/[\u0000-\u001F\u007F]/g, "").trim();
}

export function normalizeInstagram(value: unknown) {
  if (typeof value !== "string") {
    return undefined;
  }

  const clean = stripHtml(value);

  if (!clean) {
    return undefined;
  }

  const handle = clean.startsWith("@") ? clean.slice(1) : clean;
  if (/^[A-Za-z0-9._]{1,30}$/.test(handle)) {
    return `https://www.instagram.com/${handle}`;
  }

  try {
    const url = new URL(clean);
    const hostname = url.hostname.toLowerCase();

    if (
      (url.protocol === "https:" || url.protocol === "http:") &&
      (hostname === "instagram.com" || hostname === "www.instagram.com")
    ) {
      return `https://www.instagram.com${url.pathname.replace(/[<>]/g, "")}`;
    }
  } catch {
    return undefined;
  }

  return undefined;
}

export const instagram = z.preprocess(
  normalizeInstagram,
  z.string().url().max(255).optional()
);
