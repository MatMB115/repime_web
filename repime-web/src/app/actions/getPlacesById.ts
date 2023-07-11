import prisma from "@/app/libs/prisma_db"

interface IParams {
    placeId?: number;
}

export default async function getPlaceById(
    params: IParams
) {
  try{
    const { placeId } = params;

    const place = await prisma.place_page.findUnique({
        where: {
            id_vaga: Number(placeId)
        },
    });

    if(!place) {
      return null;
    }
    
    const updateVisitas = await prisma.vaga.update({
      where:{
        id: place.id_vaga
      },
      data: {
        qtd_visitas: { increment: 1}
      }
    });

    return place;
  } catch (error: any){
    throw new Error(error);
  }
}