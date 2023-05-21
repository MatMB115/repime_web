import { getServerSession } from "next-auth/next";

import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import prisma from "../../../src/app/libs/prisma_db"

export async function getSession() {
    return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
    try {
        const session = await getSession();

        if (!session?.user?.email){
            return null;
        }

        const currentUser = await prisma.tb_usuario.findUnique({
            where: {
                email: session.user.email as string
            }
        });

        if(!currentUser){
            return null;
        }

        return currentUser;
    } catch (error: any){
        return null;
    }
}

