import { tb_usuario } from "@prisma/client";
import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface Session {
        user: tb_usuario
    };
}

declare module "next-auth" {
    interface User extends UserModel {
        id: number;
    }
}