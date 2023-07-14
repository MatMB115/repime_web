import prisma from "@/app/libs/prisma_db"

export default async function getKitnetRepublica() {
    try {
        const places = await prisma.dashboard_pie_chart_kitnet_republica.findFirst()

        return places;
    } catch (error: any) {
        throw new Error(error);
    }
}