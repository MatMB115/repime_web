import { NextApiRequest, NextApiResponse } from "next";
import { requireApiUser } from "@/server/api/auth";
import { failure, success } from "@/server/api/respond";
import { UserService } from "@/server/services/userService";
import { updateUserSchema } from "@/server/validators/user.dto";
import { ApiError } from "@/server/api/errors";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "PUT") {
      throw new ApiError(405, "Método não permitido");
    }

    const authUser = await requireApiUser(req, res);
    const input = updateUserSchema.parse(req.body);
    const user = await UserService.update(authUser, input);

    return success(res, `O perfil de ${user.name} foi atualizado com sucesso!`);
  } catch (error) {
    return failure(res, error);
  }
}
