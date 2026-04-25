import { NextApiRequest, NextApiResponse } from "next";
import { requireApiUser } from "@/server/api/auth";
import { failure, success } from "@/server/api/respond";
import { ResidenciaService } from "@/server/services/residenciaService";
import { updateResidenciaSchema } from "@/server/validators/residencia.dto";
import { ApiError } from "@/server/api/errors";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "PUT") {
      throw new ApiError(405, "Método não permitido");
    }

    const authUser = await requireApiUser(req, res);
    const input = updateResidenciaSchema.parse(req.body);
    const residencia = await ResidenciaService.update(authUser, input);

    return success(res, `A residência ${residencia.nome} foi atualizada com sucesso!`);
  } catch (error) {
    return failure(res, error);
  }
}
