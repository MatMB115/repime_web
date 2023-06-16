'use client'

import { User, residencia_vagas_fotos_cidade } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import Image from "next/image";

interface PlaceCardProps {
    data: residencia_vagas_fotos_cidade;
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
    
    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) =>{
            e.stopPropagation();

            if(disabled) {
                return;
            }

            onAction?.(actionId);
        }, [onAction, actionId, disabled]);

    return ( 
        <div 
            onClick={() => router.push(`/places/${data.id_vaga}`)}
            className="
                cols-span-1 cursor-point group
            "
        >
            <div className="flex flex-col gap-2 w-full">
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
                        src={data.foto as string}
                        className="
                            object-cover
                            h-full
                            w-full
                            group-hover:scale-110
                            transition
                        "
                    />
                </div>
                <div className="font-semibold text-lg">
                    {data.cidade_nome}, {data.uf}
                </div>
                <div className="font-light text-neutral-500">
                    {data.end_bairro} - {data.end_rua}
                </div>
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
