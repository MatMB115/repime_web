'use client'

import Avatar from "../Avatar";
import getCategory from "@/app/function/getCategory";
import PlaceCategory from "./PlaceCategory";


interface PlaceInfoRep {
    hostName: string,
    hostImg: string;
    description: string;
    hasGarage: boolean;
    burgh: string;
    complement: string;
    cep: string;
    price: number;
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
    hostName,
    hostImg,
    description,
    hasGarage,
    cep,
    price,
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
                    <div>Ofertada por {hostName}</div>
                    <Avatar src={hostImg} />
                </div>
                <div className="font-semibold text-zinc-700">Contato: {contato}</div>
                {contract && (
                    <div className="font-semibold text-zinc-700">Tempo do Contrato: {contract} meses</div>
                )}
                <div 
                    className="
                        flex
                        flex-row
                        items-center
                        gap-2
                        font-light
                        text-neutral-500
                    "
                >
                    <div>
                        {hasGarage && (
                            <>
                                <div className="flex flex-row gap-2 items-center">
                                    <div className="p-2 h-1 w-1 bg-repimeblue rounded-lg"></div>
                                    <div>Almoço</div>
                                </div>
                            </>
                        )}
                    </div>
                    <div>
                        {hasPets && (
                            <>
                                <div className="flex flex-row gap-2 items-center">
                                    <div className="p-2 h-1 w-1 bg-repimeblue rounded-lg"></div>
                                    <div>Animais</div>
                                </div>
                            </>
                        )}
                    </div>
                    <div>
                        {hasLunch && (
                            <>
                                <div className="flex flex-row gap-2 items-center">
                                    <div className="p-2 h-1 w-1 bg-repimeblue rounded-lg"></div>
                                    <div>Almoço</div>
                                </div>
                            </>
                        )}
                    </div>
                    <div>
                        {hasDinner && (
                            <>
                                <div className="flex flex-row gap-2 items-center">
                                    <div className="p-2 h-1 w-1 bg-repimeblue rounded-lg"></div>
                                    <div>Janta</div>
                                </div>
                            </>
                        )}
                    </div>
                    <div>
                        {hasDiarist && (
                            <>
                                <div className="flex flex-row gap-2 items-center">
                                    <div className="p-2 h-1 w-1 bg-repimeblue rounded-lg"></div>
                                    <div>Diarista</div>
                                </div>
                            </>
                        )}
                    </div>
                    <div>
                        {hasPranks && (
                            <>
                                <div className="flex flex-row gap-2 items-center">
                                    <div className="p-2 h-1 w-1 bg-repimeblue rounded-lg"></div>
                                    <div>Trotes</div>
                                </div>
                            </>
                        )}
                    </div>
                    <div>
                        {includeEnergy && (
                            <>
                                <div className="flex flex-row gap-2 items-center">
                                    <div className="p-2 h-1 w-1 bg-repimeblue rounded-lg"></div>
                                    <div>Energia Inclusa</div>
                                </div>
                            </>
                        )}
                    </div>
                    <div>
                        {includeInternet && (
                            <>
                                <div className="flex flex-row gap-2 items-center">
                                    <div className="p-2 h-1 w-1 bg-repimeblue rounded-lg"></div>
                                    <div>Internet Inclusa</div>
                                </div>
                            </>
                        )}
                    </div>
                    <div>
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