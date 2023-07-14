import prisma from "@/app/libs/prisma_db"

export default async function getDeletedPlaces() {
    try {
        const places = await prisma.dashboard_chart.findFirst()

        return places;
    } catch (error: any) {
        throw new Error(error);
    }
}