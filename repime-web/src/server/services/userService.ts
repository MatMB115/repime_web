import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

import prisma from "@/app/libs/prisma_db";
import { ApiError } from "@/server/api/errors";
import { AuthenticatedUser, assertSelfOrAdmin } from "@/server/api/auth";
import { CreateUserInput, LoginUserInput, UpdateUserInput } from "@/server/validators/user.dto";

function handlePrismaUserError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
    throw new ApiError(409, "Já existe um usuário cadastrado com este e-mail");
  }

  throw error;
}

export const UserService = {
  async login(input: LoginUserInput) {
    const user = await prisma.user.findUnique({
      where: {
        email: input.email,
      },
    });

    if (!user?.senha) {
      throw new ApiError(401, "Credenciais inválidas");
    }

    const passwordMatches = await bcrypt.compare(input.senha, user.senha);

    if (!passwordMatches) {
      throw new ApiError(401, "Credenciais inválidas");
    }

    return {
      user: {
        id: user.id,
        nome: user.name,
        foto: user.image,
        email: user.email,
        contato: user.contato,
        nome_contato: user.nome_contato,
      },
    };
  },

  async create(input: CreateUserInput) {
    try {
      await prisma.user.create({
        data: {
          name: input.nome,
          email: input.email,
          senha: await bcrypt.hash(input.senha, 10),
          contato: input.contato,
          nome_contato: input.nome_contato,
          is_administrador: false,
        },
      });
    } catch (error) {
      handlePrismaUserError(error);
    }
  },

  async update(authUser: AuthenticatedUser, input: UpdateUserInput) {
    const targetUserId = input.id ?? authUser.id;
    assertSelfOrAdmin(authUser, targetUserId);

    try {
      await prisma.user.update({
        where: {
          id: targetUserId,
        },
        data: {
          email: input.email,
          name: input.nome,
          contato: input.contato,
          nome_contato: input.nome_contato,
          image: input.foto,
          ...(input.senha ? { senha: await bcrypt.hash(input.senha, 10) } : {}),
        },
      });
    } catch (error) {
      handlePrismaUserError(error);
    }
  },

  async remove(authUser: AuthenticatedUser, targetUserId: string) {
    assertSelfOrAdmin(authUser, targetUserId);

    await prisma.user.delete({
      where: {
        id: targetUserId,
      },
    });
  },
};
