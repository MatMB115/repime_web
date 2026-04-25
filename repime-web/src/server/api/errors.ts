import { ZodError } from "zod";

export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function getErrorStatus(error: unknown) {
  if (error instanceof ZodError) {
    return 400;
  }

  return error instanceof ApiError ? error.statusCode : 500;
}

export function getErrorMessage(error: unknown) {
  if (error instanceof ZodError) {
    return error.issues[0]?.message ?? "Dados inválidos";
  }

  return error instanceof Error ? error.message : "Erro interno";
}
