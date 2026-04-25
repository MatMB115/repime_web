import prisma from "@/app/libs/prisma_db"
import { place_page } from "@prisma/client";

interface IParams {
  placeId?: string;
}

export type PlaceByIdResult = place_page & {
  fotos: string[];
  titulo?: string | null;
  residencia_descricao?: string | null;
}

export default async function getPlaceById(
  params: IParams
) {
  try {
    const { placeId } = params;

    const place = await prisma.place_page.findUnique({
      where: {
        id_vaga: Number(placeId)
      },
    });

    if (!place) {
      return null;
    }

    const placePhotos = await prisma.fotoVaga.findMany({
      where: {
        id_vaga: place.id_vaga,
      },
      orderBy: {
        id: 'asc',
      },
      select: {
        foto: true,
      },
    });

    const fotos = Array.from(
      new Set(placePhotos.map((photo) => photo.foto).filter(Boolean))
    );

    const updateVisitas = await prisma.vaga.update({
      where: {
        id: place.id_vaga
      },
      data: {
        qtd_visitas: { increment: 1 }
      }
    });

    return {
      ...place,
      fotos,
    } as PlaceByIdResult;
  } catch (error: any) {
    throw new Error(error);
  }
}
