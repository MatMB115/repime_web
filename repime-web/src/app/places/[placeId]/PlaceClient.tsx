'use client'

import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import DeleteModal from "@/app/components/modals/DeleteModal";
import PlaceHead from "@/app/components/places/PlaceHead";
import PlaceInfo from "@/app/components/places/PlaceInfo";
import getContactMsg from "@/app/function/getContactMsg";
import isOwner from "@/app/function/isOwner";
import isRepublica from "@/app/function/isRepublica";
import placeType from "@/app/function/placeType";
import useDeleteModal from "@/app/hooks/useDeleteModal";
import { User, place_page } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface PlaceClientProps {
    place: place_page | null;
    currentUser?: User | null;
}

const PlaceClient: React.FC<PlaceClientProps> = ({
    place,
    currentUser
}) => {
    const tipo = placeType(place?.tipo as string);
    const republica = isRepublica(place?.tipo as string);
    const router = useRouter();
    const checkOwner = isOwner(currentUser?.id!, place?.id!)
    const msg = getContactMsg(tipo, place?.contato!, place?.end_rua!, place?.end_numero!, place?.mensalidade!)
    const deleteModal = useDeleteModal();
    
    const { 
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues:{
            id: place?.id_vaga
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        
        axios.post('/api/repime/residencia/vagas/remove', data)
        .then((response) => {
            toast.success(response.data.repime.msg_ret);
            deleteModal.onClose()
            router.push('/');
        })
        .catch(() => {
            toast.error('Algo deu errado');
        })
    }
    
    return ( 
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <PlaceHead 
                        title={`${place?.end_rua} ${place?.end_numero} ${place?.end_complemento} em ${place?.end_bairro} - ${place?.cidade_nome}`}
                        imageSrc={place!.foto}
                        locationValue={`${place?.end_cep} - ${place?.pais}, ${place?.uf}`}
                        id={place!.id_vaga}
                        currentUser={currentUser!}
                    />
                    <div 
                        className="
                            grid
                            grid-cols-1
                            md:grid-cols-7
                            md:gap-10
                            mt-6
                        "
                    >
                        <PlaceInfo
                            placeName={place?.residencia_nome!}
                            hostName={place?.name!}
                            hostImg={place?.image!}
                            description={place?.descricao!}
                            hasGarage={place?.tem_garagem!}
                            burgh={place?.end_bairro!}
                            complement={place?.end_complemento!}
                            hasPets={place?.tem_animais!}
                            hasLunch={place?.oferece_almoco!}
                            hasDinner={place?.oferece_janta!}
                            hasPranks={place?.tem_trote!}
                            hasDiarist={place?.tem_diarista!}
                            isRep={republica}
                            contato={place?.contato!}
                            contract={place?.tempo_de_contrato!}
                            includeWater={place?.agua_inclusa!}
                            includeInternet={place?.internet_inclusa!}
                            includeEnergy={place?.energia_inclusa!}
                        />
                        <div 
                            className="
                                order-first 
                                mb-10 
                                md:order-last 
                                md:col-span-3
                            "
                        >   
                            <div 
                                className="
                                bg-white 
                                    rounded-xl 
                                    border-[1px]
                                border-neutral-200 
                                    overflow-hidden
                                "
                                >
                                <div className="
                                flex flex-row items-center gap-1 p-4">
                                    <div className="text-2xl font-semibold">
                                        R${place?.mensalidade}
                                    </div>
                                    <div className="font-light text-neutral-600">
                                    mês
                                    </div>
                                </div>
                                <hr />
                                <div className="p-4">
                                    <div className="p-2">
                                        <Link href={msg} target="_blank">
                                            <Button  
                                                label="Entre em contato" 
                                                onClick={()=>{}}
                                            />
                                        </Link>
                                    </div>
                                    <div className="p-2">
                                        {checkOwner && (
                                            <>
                                                <Button
                                                    label="Delete"
                                                    onClick={deleteModal.onOpen}
                                                    pink
                                                />
                                                <DeleteModal onSubmit={handleSubmit(onSubmit)} />
                                            </>
                                            
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}
 
export default PlaceClient;