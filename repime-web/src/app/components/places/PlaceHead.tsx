'use client'

import { User } from "@prisma/client";
import Heading from "../Heading";

import Image from "next/image"

interface PlaceHeadProps {
    title: string;
    locationValue: string;
    imageSrc: string | null;
    id: number | null;
    currentUser: User | null;
}

const PlaceHead: React.FC<PlaceHeadProps> = ({
    title,
    locationValue,
    imageSrc,
    id,
    currentUser
}) => {
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
                    src={imageSrc!}
                    fill={true}
                    className="object-cover w-full"
                />
            </div>
        </>
    );
}
 
export default PlaceHead;