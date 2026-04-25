'use client'

import qs from "query-string"
import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import Heading from "../Heading";
import CitySelect, { CitySelectValue } from "../inputs/CitySelect";

const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();

    const [location, setLocation] = useState<CitySelectValue>()
    const [searchTerm, setSearchTerm] = useState('');

    const onSubmit = useCallback(async () => {
        let currentQuery = {};
        if(params){
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            searchTerm: searchTerm || undefined
        } 

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, {skipNull: true });

        searchModal.onClose();

        router.push(url);
    }, [params, router, searchModal, location, searchTerm])

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                title="O que você procura?"
                subtitle="Pesquise pelo nome da república ou título da vaga"
            />
            <div className="w-full relative">
                <input
                    placeholder="Ex: República Alcatraz..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="
                        peer
                        w-full
                        p-4
                        font-light
                        bg-white
                        border-2
                        rounded-md
                        outline-none
                        transition
                        border-neutral-300
                        focus:border-repimehardblue
                    "
                />
            </div>
            <hr />
            <Heading 
                title="Escolha uma cidade"
                subtitle="Filtre por localização"
            />
            <CitySelect value={location} onChange={(value) => 
                setLocation(value as CitySelectValue)
            }/>
        </div>
    )

    return (
        <Modal 
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="Filtros"
            actionLabel="Busque"
            submitOnEnter
            body={bodyContent}
        />
    );
}
 
export default SearchModal;