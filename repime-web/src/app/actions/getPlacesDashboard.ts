import prisma from "@/app/libs/prisma_db"

export default async function getPlacesDashboard() {
    try {
        const places = await prisma.residencia_vagas_fotos_cidade.findMany({
            orderBy: {
                qtd_visitas: 'desc'
            }
        })

        return places;
    } catch (error: any) {
        throw new Error(error);
    }
}