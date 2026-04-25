import prisma from "@/app/libs/prisma_db";
import { AuthenticatedUser } from "@/server/api/auth";
import { CreateVagaInput, UpdateVagaInput } from "@/server/validators/vaga.dto";
import { ResidenciaService } from "./residenciaService";
import { ApiError } from "../api/errors";

export const VagaService = {
  async create(authUser: AuthenticatedUser, input: CreateVagaInput) {
    await ResidenciaService.assertCanManageResidence(authUser, input.tb_residencia);

    const vaga = await prisma.vaga.create({
      data: {
        titulo: input.titulo,
        mensalidade: input.mensalidade,
        descricao: input.descricao,
        e_mobiliado: input.e_mobiliado,
        tb_residencia: {
          connect: {
            id: input.tb_residencia,
          },
        },
      },
    });

    await prisma.fotoVaga.create({
      data: {
        foto: input.fotoVaga.foto,
        tb_vaga: {
          connect: {
            id: vaga.id,
          },
        },
      },
    });

    return vaga;
  },

  async update(authUser: AuthenticatedUser, input: UpdateVagaInput) {
    const vaga = await prisma.vaga.findUnique({
      where: { id: input.id },
      select: {
        id: true,
        tb_residencia: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!vaga) {
      throw new ApiError(404, "Vaga não encontrada");
    }

    await ResidenciaService.assertCanManageResidence(authUser, vaga.tb_residencia.id);

    return prisma.vaga.update({
      where: {
        id: input.id,
      },
      data: {
        titulo: input.titulo,
        mensalidade: input.mensalidade,
        descricao: input.descricao,
        e_mobiliado: input.e_mobiliado,
      },
    });
  },

  async remove(authUser: AuthenticatedUser, vagaId: number) {
    const vaga = await prisma.vaga.findUnique({
      where: { id: vagaId },
      select: {
        tb_residencia: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!vaga) {
      throw new ApiError(404, "Vaga não encontrada");
    }

    await ResidenciaService.assertCanManageResidence(authUser, vaga.tb_residencia.id);

    await prisma.vaga.delete({
      where: {
        id: vagaId,
      },
    });
  },
};
