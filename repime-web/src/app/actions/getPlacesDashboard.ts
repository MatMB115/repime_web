import prisma from "@/app/libs/prisma_db"

export default async function getPlacesDashboard() {
    try {
        const places = await prisma.residencia_vagas_fotos_cidade.findMany({
            orderBy: {
                qtd_visitas: 'desc'
            }
        })

        const uniquePlaces = Array.from(
            new Map(places.map((place) => [place.id_vaga, place])).values()
        );

        return uniquePlaces;
    } catch (error: any) {
        throw new Error(error);
    }
}