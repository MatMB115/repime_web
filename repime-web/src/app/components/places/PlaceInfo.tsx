'use client'

import Avatar from "../Avatar";
import getCategory from "@/app/function/getCategory";
import PlaceCategory from "./PlaceCategory";


interface PlaceInfoRep {
    placeName: string,
    hostName: string,
    hostImg: string;
    description: string;
    hasGarage: boolean;
    burgh: string;
    complement: string;
    hasPets: boolean;
    hasLunch: boolean;
    hasDinner: boolean;
    hasPranks: boolean;
    hasDiarist: boolean;
    isRep: boolean;
    contato: string;
    contract: number;
    includeWater: boolean;
    includeInternet: boolean;
    includeEnergy: boolean;
}

const PlaceInfoRep: React.FC<PlaceInfoRep> = ({
    placeName,
    hostName,
    hostImg,
    description,
    hasGarage,
    hasPets,
    hasLunch,
    hasDinner,
    hasPranks,
    hasDiarist,
    isRep,
    contato,
    contract,
    includeWater,
    includeEnergy,
    includeInternet
}) => {
    const category = getCategory(isRep);

    return ( 
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div 
                    className="
                        text-xl
                        font-semibold
                        flex
                        flex-row
                        items-center
                        gap-2
                    "
                >
                    <div>Ofertada por {hostName} em {isRep} {isRep ? 'república' : 'kitnet'} {placeName}</div>
                    <Avatar src={hostImg} />
                </div>
                <div className="font-semibold text-zinc-700">Contato: {contato}</div>
                
                {contract && (
                    <div className="font-semibold text-zinc-700">Tempo do Contrato: {contract} meses</div>
                )}
                <div 
                    className="
                        grid
                        items-center
                        gap-2
                        font-light
                        text-neutral-500
                        grid-cols-4
                    "
                >

                    {hasGarage && (
                        <>
                            <div className="flex flex-row gap-2 items-center">
                                <div className="p-2 h-1 w-1 bg-repimeblue rounded-lg"></div>
                                <div>Garagem</div>
                            </div>
                        </>
                    )}


                    {hasPets && (
                        <>
                            <div className="flex flex-row gap-2 items-center">
                                <div className="p-2 h-1 w-1 bg-repimeblue rounded-lg"></div>
                                <div>Animais</div>
                            </div>
                        </>
                    )}


                    {hasLunch && (
                        <>
                            <div className="flex flex-row gap-2 items-center">
                                <div className="p-2 h-1 w-1 bg-repimeblue rounded-lg"></div>
                                <div>Almoço</div>
                            </div>
                        </>
                    )}

                    {hasDinner && (
                        <>
                            <div className="flex flex-row gap-2 items-center">
                                <div className="p-2 h-1 w-1 bg-repimeblue rounded-lg"></div>
                                <div>Janta</div>
                            </div>
                        </>
                    )}

                    {hasDiarist && (
                        <>
                            <div className="flex flex-row gap-2 items-center">
                                <div className="p-2 h-1 w-1 bg-repimeblue rounded-lg"></div>
                                <div>Diarista</div>
                            </div>
                        </>
                    )}

                    {hasPranks && (
                        <>
                            <div className="flex flex-row gap-2 items-center">
                                <div className="p-2 h-1 w-1 bg-repimeblue rounded-lg"></div>
                                <div>Trotes</div>
                            </div>
                        </>
                    )}

                    {includeEnergy && (
                        <>
                            <div className="flex flex-row gap-2 items-center">
                                <div className="p-2 h-1 w-1 bg-repimeblue rounded-lg"></div>
                                <div>Energia Inclusa</div>
                            </div>
                        </>
                    )}

                    {includeInternet && (
                        <>
                            <div className="flex flex-row gap-2 items-center">
                                <div className="p-2 h-1 w-1 bg-repimeblue rounded-lg"></div>
                                <div>Internet Inclusa</div>
                            </div>
                        </>
                    )}

                    {includeWater && (
                        <>
                            <div className="flex flex-row gap-2 items-center">
                                <div className="p-2 h-1 w-1 bg-repimeblue rounded-lg"></div>
                                <div>Água Inclusa</div>
                            </div>
                        </>
                    )}

                </div>
            </div>
            <hr />
            <PlaceCategory 
                icon={category.icon}
                label={category.label}
                description={category.description}
            />
            <hr />
            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>
            <hr />
        </div>
    );
}
 
export default PlaceInfoRep;