import { getServerSession } from "next-auth/next";

import { authOptions } from "../../../pages/api/auth/[...nextauth]";

export async function getSession() {
    return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
    try {
        return (await getSession())?.user;

    } catch (error: any) {
        return null;
    }
}

