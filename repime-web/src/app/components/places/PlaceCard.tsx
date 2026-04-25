'use client'

import { User, residencia_vagas_fotos_cidade } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";

type PlaceCardData = residencia_vagas_fotos_cidade & {
    fotos?: string[] | null;
    titulo?: string | null;
}

interface PlaceCardProps {
    data: PlaceCardData;
    currentUser: User | null | undefined;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
}

const PlaceCard: React.FC<PlaceCardProps> = ({
    data,
    currentUser,
    onAction,
    disabled,
    actionLabel,
    actionId = ""
}) => {
    const router = useRouter();
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    const photos = useMemo(() => {
        const rawPhotos = data.fotos && data.fotos.length > 0
            ? data.fotos
            : [data.foto as string];

        const sanitizedPhotos = rawPhotos.filter(
            (photo): photo is string => Boolean(photo)
        );

        return sanitizedPhotos.length > 0
            ? sanitizedPhotos
            : ['/images/placeholder.jpg'];
    }, [data.fotos, data.foto]);

    useEffect(() => {
        setCurrentPhotoIndex(0);
    }, [data.id_vaga]);

    const currentPhoto = photos[currentPhotoIndex] ?? '/images/placeholder.jpg';
    const hasMultiplePhotos = photos.length > 1;

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if (disabled) {
                return;
            }

            onAction?.(actionId);
        }, [onAction, actionId, disabled]);

    const handlePreviousPhoto = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        setCurrentPhotoIndex((previousIndex) => {
            if (previousIndex === 0) {
                return photos.length - 1;
            }

            return previousIndex - 1;
        });
    }, [photos.length]);

    const handleNextPhoto = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        setCurrentPhotoIndex((previousIndex) => {
            if (previousIndex === photos.length - 1) {
                return 0;
            }

            return previousIndex + 1;
        });
    }, [photos.length]);

    return (
        <div
            onClick={() => router.push(`/places/${data.id_vaga}`)}
            className="
                cols-span-1 cursor-pointer group
            "
        >
            <div className="flex flex-col gap-2 w-full">
                <div className="font-bold text-lg line-clamp-1 text-repimehardblue">
                    {data.titulo || `${data.end_rua}, ${data.end_numero}`}
                </div>
                <div
                    className="
                        aspect-square
                        w-full
                        relative
                        overflow-hidden
                        rounded-xl
                    "
                >
                    <Image
                        fill
                        alt="Vaga"
                        src={currentPhoto}
                        className="
                            object-cover
                            h-full
                            w-full
                            group-hover:scale-110
                            transition
                        "
                    />

                    {hasMultiplePhotos && (
                        <>
                            <button
                                type="button"
                                onClick={handlePreviousPhoto}
                                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-2 py-1 text-white"
                                aria-label="Foto anterior"
                            >
                                ‹
                            </button>
                            <button
                                type="button"
                                onClick={handleNextPhoto}
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-2 py-1 text-white"
                                aria-label="Próxima foto"
                            >
                                ›
                            </button>

                            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
                                {photos.map((photo, index) => (
                                    <span
                                        key={`${data.id_vaga}-${photo}-${index}`}
                                        className={`h-2 w-2 rounded-full ${index === currentPhotoIndex
                                            ? 'bg-white'
                                            : 'bg-white/50'
                                            }`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
                <div className="font-semibold text-lg">
                    {data.cidade_nome}, {data.uf}
                </div>
                <div className="font-light text-neutral-500">
                    {data.end_bairro} - {data.end_rua}
                </div>
                {data.tempo_unifei && (
                    <div className="text-sm font-medium text-repimehardblue">
                        A pé: {data.tempo_unifei} min da UNIFEI
                    </div>
                )}
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">
                        R$ {data.mensalidade}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlaceCard;
