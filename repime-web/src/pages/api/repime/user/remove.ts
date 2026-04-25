import { NextApiRequest, NextApiResponse } from "next";
import { requireApiUser } from "@/server/api/auth";
import { failure, success } from "@/server/api/respond";
import { UserService } from "@/server/services/userService";
import { removeUserSchema } from "@/server/validators/user.dto";
import { ApiError } from "@/server/api/errors";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      throw new ApiError(405, "Método não permitido");
    }

    const authUser = await requireApiUser(req, res);
    const { id } = removeUserSchema.parse(req.body);
    
    // Garante que o targetUserId seja uma string (id enviado ou o próprio authUser.id)
    const targetUserId = id || authUser.id;
    await UserService.remove(authUser, targetUserId);

    return success(res, "Sua conta foi removida com sucesso.");
  } catch (error) {
    return failure(res, error);
  }
}
