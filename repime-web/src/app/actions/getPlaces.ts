import prisma from "@/app/libs/prisma_db"
import { residencia_vagas_fotos_cidade } from "@prisma/client";

export interface IPlacesParams {
    locationValue?: string;
    category?: string;
    searchTerm?: string;
}

export type PlaceWithPhotos = residencia_vagas_fotos_cidade & {
    fotos: string[];
    titulo?: string | null;
}

const legacyCategoryToSlug: Record<string, string> = {
    'Trotes': 'trotes',
    'Diarista': 'diarista',
    'Garagem': 'garagem',
    'Kitnets': 'kitnets',
    'República': 'republica',
    'Repúblicas': 'republica',
    'Menor Preço': 'menor-preco',
    'Maior Preço': 'maior-preco',
    'Internet': 'internet',
    'Animais': 'animais',
    'Rep.Feminina': 'rep-feminina',
    'Rep.Masculina': 'rep-masculina',
};

const normalizeCategory = (category?: string) => {
    if (!category) return undefined;

    return legacyCategoryToSlug[category] ?? category;
};

export default async function getPlaces(
    params: IPlacesParams
) {
    try {
        const { locationValue, category, searchTerm } = params;
        const normalizedCategory = normalizeCategory(category);

        let query: any = {};
        let order: any = {};

        if (locationValue) {
            query.id_cidade = {
                equals: parseInt(locationValue, 10),
            };
        }

        if (searchTerm) {
            query.OR = [
                {
                    titulo: {
                        contains: searchTerm,
                        mode: 'insensitive'
                    }
                },
                {
                    residencia_nome: {
                        contains: searchTerm,
                        mode: 'insensitive'
                    }
                }
            ];
        }

        if (normalizedCategory) {
            if (normalizedCategory === 'trotes') query.tem_trote = true;
            if (normalizedCategory === 'diarista') query.tem_diarista = true;
            if (normalizedCategory === 'menor-preco') order.mensalidade = 'asc';
            if (normalizedCategory === 'maior-preco') order.mensalidade = 'desc';
            if (normalizedCategory === 'republica') query.tipo = 'republica';
            if (normalizedCategory === 'kitnets') query.tipo = 'kitnet';
            if (normalizedCategory === 'garagem') query.tem_garagem = true;
            if (normalizedCategory === 'internet') query.internet_inclusa = true;
            if (normalizedCategory === 'animais') query.tem_animais = true;
            if (normalizedCategory === 'rep-feminina') query.tipo_republica = 'feminina';
            if (normalizedCategory === 'rep-masculina') query.tipo_republica = 'masculina';
        } else {
            order = { id_vaga: 'desc' }
        }



        const places = await prisma.residencia_vagas_fotos_cidade.findMany({
            where: query,
            orderBy: order,
        });

        const placeIds = places.map((place) => place.id_vaga);

        const photosByPlaceId = new Map<number, string[]>();

        if (placeIds.length > 0) {
            const photos = await prisma.fotoVaga.findMany({
                where: {
                    id_vaga: {
                        in: placeIds,
                    },
                },
                select: {
                    id_vaga: true,
                    foto: true,
                },
                orderBy: {
                    id: 'asc',
                },
            });

            for (const photo of photos) {
                const existingPhotos = photosByPlaceId.get(photo.id_vaga) ?? [];

                if (!existingPhotos.includes(photo.foto)) {
                    existingPhotos.push(photo.foto);
                }

                photosByPlaceId.set(photo.id_vaga, existingPhotos);
            }
        }

        return places.map((place) => ({
            ...place,
            fotos: photosByPlaceId.get(place.id_vaga) ?? (place.foto ? [place.foto] : []),
        }));
    } catch (error: any) {
        throw new Error(error);
    }
}