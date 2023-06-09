import bcrypt from "bcrypt";

import prisma from "@/app/libs/prisma_db";
import { NextResponse } from "next/server";

export async function POST(
    request: Request
) {
    const body = await request.json();
    const {
        email,
        nome,
        senha,
        contato,
        is_administrador
    } = body;

    const hashedPassword = await bcrypt.hash(senha, 12)

    const user = await prisma.user.create({
        data: {
            email: email,
            name: nome,
            senha: hashedPassword,
            contato: contato,
            is_administrador: is_administrador
        }
    });

    return NextResponse.json(user);
}