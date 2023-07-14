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

    const onSubmit = useCallback(async () => {
        let currentQuery = {};
        if(params){
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value
        } 

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, {skipNull: true });

        searchModal.onClose();

        router.push(url);
    }, [params, router, searchModal, location])

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                title="Escolha uma cidade"
                subtitle="Pesquise entre as vagas"
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
            body={bodyContent}
        />
    );
}
 
export default SearchModal;