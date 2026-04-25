import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/libs/authOptions";
import { ApiError } from "./errors";

export interface AuthenticatedUser {
  id: string;
  is_administrador?: boolean;
}

export async function requireApiUser(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const user = session?.user as AuthenticatedUser | undefined;

  if (!user?.id) {
    throw new ApiError(401, "Autenticação obrigatória");
  }

  return user;
}

export function assertSelfOrAdmin(authUser: AuthenticatedUser, targetUserId: string) {
  if (authUser.is_administrador || authUser.id === targetUserId) {
    return;
  }

  throw new ApiError(403, "Você não tem permissão para acessar este recurso");
}
