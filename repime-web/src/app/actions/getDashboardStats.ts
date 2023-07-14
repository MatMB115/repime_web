import prisma from "@/app/libs/prisma_db"

export default async function getDashboardStats() {
    try {
        const stats = await prisma.dashboard_stats.findFirst()

        return stats;
    } catch (error: any) {
        throw new Error(error);
    }
}