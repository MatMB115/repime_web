'use client'

import qs from "query-string"
import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import Heading from "../Heading";
import CitySelect from "../inputs/CitySelect";

const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();

    const onSubmit = useCallback(async () => {
        let currentQuery = {};
        if(params){
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery
        } 

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, {skipNull: true });

        searchModal.onClose();

        router.push(url);
    }, [params, router, searchModal])

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                title="Digite o nome da localização"
                subtitle="Pesquise entre as vagas"
            />
            <CitySelect />
        </div>
    )

    return (
        <Modal 
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={searchModal.onOpen}
            title="Filtros"
            actionLabel="Busque"
            body={bodyContent}
        />
    );
}
 
export default SearchModal;