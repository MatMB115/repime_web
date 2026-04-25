'use client'

import Avatar from "../Avatar";
import getCategory from "@/app/function/getCategory";
import PlaceCategory from "./PlaceCategory";
import ReactMarkdown from "react-markdown";


interface PlaceInfoRep {
    placeName: string,
    hostName: string,
    hostImg: string;
    vagaDescription?: string | null;
    residenciaDescription?: string | null;
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
    walkToUnifei?: number | null;
    walkToCenter?: number | null;
    internetMbps?: number | null;
    instagramHref?: string | null;
    includeWater: boolean;
    includeInternet: boolean;
    includeEnergy: boolean;
}

const PlaceInfoRep: React.FC<PlaceInfoRep> = ({
    placeName,
    hostName,
    hostImg,
    vagaDescription,
    residenciaDescription,
    hasGarage,
    hasPets,
    hasLunch,
    hasDinner,
    hasPranks,
    hasDiarist,
    isRep,
    contato,
    contract,
    walkToUnifei,
    walkToCenter,
    internetMbps,
    instagramHref,
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
                    <div>Ofertada por {hostName} </div>
                    <Avatar src={hostImg} />
                </div>
                <div className="font-semibold text-zinc-700">Contato: {contato}</div>

                {contract && (
                    <div className="font-semibold text-zinc-700">Tempo do Contrato: {contract} meses</div>
                )}
                {(walkToUnifei || walkToCenter || internetMbps || instagramHref) && (
                    <div className="flex flex-col gap-2 rounded-md border border-neutral-200 p-4">
                        <div className="font-semibold text-zinc-700">Características da residência</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-neutral-600">
                            {walkToUnifei && (
                                <div>A pé: {walkToUnifei} min até a UNIFEI</div>
                            )}
                            {walkToCenter && (
                                <div>A pé: {walkToCenter} min até o centro</div>
                            )}
                            {internetMbps && (
                                <div>Internet: {internetMbps} Mbps</div>
                            )}
                            {instagramHref && (
                                <a
                                    href={instagramHref}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="text-repimehardblue hover:underline"
                                >
                                    Instagram da residência
                                </a>
                            )}
                        </div>
                    </div>
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
            <div className="flex flex-col gap-2">
                <div className="text-base font-semibold text-neutral-800">Descrição da Vaga</div>
                <div className="text-lg font-light text-neutral-500 prose-strong:font-bold prose-em:italic whitespace-pre-wrap">
                    <ReactMarkdown>
                        {vagaDescription || "Sem descrição da vaga."}
                    </ReactMarkdown>
                </div>
            </div>
            <hr />
            <div className="flex flex-col gap-2">
                <div className="text-base font-semibold text-neutral-800">
                    {isRep ? "Sobre a República" : "Sobre a Kitnet"}
                </div>
                <div className="text-lg font-light text-neutral-500 prose-strong:font-bold prose-em:italic whitespace-pre-wrap">
                    <ReactMarkdown>
                        {residenciaDescription || `Sem descrição da ${isRep ? "república" : "kitnet"}.`}
                    </ReactMarkdown>
                </div>
            </div>
            <hr />
        </div>
    );
}

export default PlaceInfoRep;
