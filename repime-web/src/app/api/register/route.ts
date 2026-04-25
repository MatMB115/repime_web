import { NextResponse } from "next/server";

import { getErrorMessage, getErrorStatus } from "@/server/api/errors";
import { UserService } from "@/server/services/userService";
import { createUserSchema } from "@/server/validators/user.dto";

export async function POST(request: Request) {
  try {
    const input = createUserSchema.parse(await request.json());

    await UserService.create(input);

    return NextResponse.json({ message: "Usuário criado com sucesso!" });
  } catch (error) {
    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status: getErrorStatus(error) }
    );
  }
}
