'use client'

import { User } from "@prisma/client";
import Heading from "../Heading";

import Image from "next/image"
import { useMemo, useState } from "react";

interface PlaceHeadProps {
    title: string;
    locationValue: string;
    imageSrc: string | null;
    images?: string[] | null;
    userName?: string | null;
    id: number | null;
    currentUser: User | null;
}

const PlaceHead: React.FC<PlaceHeadProps> = ({
    title,
    locationValue,
    imageSrc,
    images,
    userName,
    id,
    currentUser
}) => {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    const photos = useMemo(() => {
        const rawPhotos = images && images.length > 0
            ? images
            : [imageSrc as string];

        const sanitizedPhotos = rawPhotos.filter(
            (photo): photo is string => Boolean(photo)
        );

        return sanitizedPhotos.length > 0
            ? sanitizedPhotos
            : ['/images/placeholder.jpg'];
    }, [images, imageSrc]);

    const hasMultiplePhotos = photos.length > 1;
    const currentPhoto = photos[currentPhotoIndex] ?? '/images/placeholder.jpg';

    const showPreviousPhoto = () => {
        setCurrentPhotoIndex((previousIndex) => {
            if (previousIndex === 0) {
                return photos.length - 1;
            }

            return previousIndex - 1;
        });
    };

    const showNextPhoto = () => {
        setCurrentPhotoIndex((previousIndex) => {
            if (previousIndex === photos.length - 1) {
                return 0;
            }

            return previousIndex + 1;
        });
    };

    return (
        <>
            <Heading
                title={title}
                subtitle={locationValue}
            />
            <div
                className="
                    w-full
                    h-[60vh]
                    overflow-hidden
                    rounded-xl
                    relative
                "
            >
                <Image
                    alt="Imagem da vaga aberta"
                    src={currentPhoto}
                    fill={true}
                    className="object-cover w-full"
                />

                {hasMultiplePhotos && (
                    <>
                        <button
                            type="button"
                            onClick={showPreviousPhoto}
                            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-3 py-2 text-white"
                            aria-label="Foto anterior"
                        >
                            ‹
                        </button>
                        <button
                            type="button"
                            onClick={showNextPhoto}
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-3 py-2 text-white"
                            aria-label="Próxima foto"
                        >
                            ›
                        </button>

                        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
                            {photos.map((photo, index) => (
                                <span
                                    key={`${photo}-${index}`}
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
        </>
    );
}

export default PlaceHead;