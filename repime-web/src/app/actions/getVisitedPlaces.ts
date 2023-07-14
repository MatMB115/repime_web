import prisma from "@/app/libs/prisma_db"

export default async function getKitnetRepublica() {
    try {
        const places = await prisma.dashboard_chart_qtd_visitas.findFirst()

        return places;
    } catch (error: any) {
        throw new Error(error);
    }
}