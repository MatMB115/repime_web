import { tipos_rep, tipos_residencia } from "@prisma/client";

import prisma from "@/app/libs/prisma_db";
import { ApiError } from "@/server/api/errors";
import { AuthenticatedUser, assertSelfOrAdmin } from "@/server/api/auth";
import {
  CreateResidenciaInput,
  UpdateResidenciaInput,
} from "@/server/validators/residencia.dto";

function resolveResidenceType(input: CreateResidenciaInput | UpdateResidenciaInput) {
  const normalizedType = input.residencia.tipo
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  const isRepublica = normalizedType === "republica";
  const repType = input.republica?.tipo?.value;

  if (isRepublica) {
    return {
      tipo: tipos_residencia.republica,
      tipo_republica:
        repType === "Masculina"
          ? tipos_rep.masculina
          : repType === "Feminina"
            ? tipos_rep.feminina
            : tipos_rep.mista,
      fundacao: input.residencia.fundacao,
      tempo_de_contrato: null,
      agua_inclusa: null,
      internet_inclusa: null,
      energia_inclusa: null,
    };
  }

  return {
    tipo: tipos_residencia.kitnet,
    tipo_republica: null,
    fundacao: null,
    tempo_de_contrato: input.residencia.tempo_de_contrato,
    tem_diarista: null,
    tem_animais: null,
    oferece_almoco: null,
    oferece_janta: null,
    tem_trote: null,
  };
}

function buildResidenciaData(input: CreateResidenciaInput | UpdateResidenciaInput) {
  const residencia = input.residencia;
  const typeFields = resolveResidenceType(input);

  return {
    nome: residencia.nome,
    descricao: residencia.descricao,
    tem_garagem: residencia.tem_garagem,
    tem_diarista: residencia.tem_diarista,
    tem_animais: residencia.tem_animais,
    oferece_almoco: residencia.oferece_almoco,
    oferece_janta: residencia.oferece_janta,
    tem_trote: residencia.tem_trote,
    agua_inclusa: residencia.agua_inclusa,
    internet_inclusa: residencia.internet_inclusa,
    energia_inclusa: residencia.energia_inclusa,
    tempo_unifei: residencia.tempo_unifei,
    tempo_centro: residencia.tempo_centro,
    internet_mbps: residencia.internet_mbps,
    instagram: residencia.instagram,
    end_numero: residencia.end_numero,
    end_rua: residencia.end_rua,
    end_bairro: residencia.end_bairro,
    end_complemento: residencia.end_complemento,
    end_cep: residencia.end_cep,
    ...typeFields,
  };
}

async function assertCanManageResidence(authUser: AuthenticatedUser, residenceId: number) {
  const residence = await prisma.residencia.findUnique({
    where: { id: residenceId },
    select: { id_user: true },
  });

  if (!residence) {
    throw new ApiError(404, "Residência não encontrada");
  }

  assertSelfOrAdmin(authUser, residence.id_user);
}

export const ResidenciaService = {
  async create(authUser: AuthenticatedUser, input: CreateResidenciaInput) {
    const residencia = await prisma.residencia.create({
      data: {
        ...buildResidenciaData(input),
        tb_cidade: {
          connect: {
            id: input.cidade.value,
          },
        },
        tb_usuario: {
          connect: {
            id: authUser.id,
          },
        },
      },
    });

    return residencia;
  },

  async update(authUser: AuthenticatedUser, input: UpdateResidenciaInput) {
    await assertCanManageResidence(authUser, input.residencia.id);

    return prisma.residencia.update({
      where: {
        id: input.residencia.id,
      },
      data: {
        ...buildResidenciaData(input),
        tb_cidade: {
          connect: {
            id: input.cidade.value,
          },
        },
      },
    });
  },

  async remove(authUser: AuthenticatedUser, residenceId: number) {
    await assertCanManageResidence(authUser, residenceId);

    await prisma.residencia.delete({
      where: {
        id: residenceId,
      },
    });
  },

  async listForUser(authUser: AuthenticatedUser, targetUserId: string) {
    assertSelfOrAdmin(authUser, targetUserId);

    return prisma.residencia.findMany({
      include: {
        tb_vaga: true,
      },
      where: {
        id_user: targetUserId,
      },
    });
  },

  assertCanManageResidence,
};
