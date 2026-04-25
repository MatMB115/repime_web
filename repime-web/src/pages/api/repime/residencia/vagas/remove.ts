import { NextApiRequest, NextApiResponse } from "next";
import { requireApiUser } from "@/server/api/auth";
import { failure, success } from "@/server/api/respond";
import { VagaService } from "@/server/services/vagaService";
import { removeVagaSchema } from "@/server/validators/vaga.dto";
import { ApiError } from "@/server/api/errors";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      throw new ApiError(405, "Método não permitido");
    }

    const authUser = await requireApiUser(req, res);
    const { id } = removeVagaSchema.parse(req.body);
    await VagaService.remove(authUser, id);

    return success(res, "Vaga removida com sucesso!");
  } catch (error) {
    return failure(res, error);
  }
}
