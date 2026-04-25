import { NextApiRequest, NextApiResponse } from "next";
import { requireApiUser } from "@/server/api/auth";
import { failure, success } from "@/server/api/respond";
import { ResidenciaService } from "@/server/services/residenciaService";
import { createResidenciaSchema } from "@/server/validators/residencia.dto";
import { ApiError } from "@/server/api/errors";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      throw new ApiError(405, "Método não permitido");
    }

    const authUser = await requireApiUser(req, res);
    const input = createResidenciaSchema.parse(req.body);
    const residencia = await ResidenciaService.create(authUser, input);

    return success(res, `A residência ${residencia.nome} foi criada com sucesso!`);
  } catch (error) {
    return failure(res, error);
  }
}
