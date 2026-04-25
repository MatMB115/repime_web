import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/libs/authOptions";

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

