'use client'

import Heading from "@/app/components/Heading";
import { Residencia } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import usePlaceModal from "../../hooks/usePlaceModal";
import useResidenceUpdateModal from "../../hooks/useResidenceUpdateModal";
import useDeleteModal from "@/app/hooks/useDeleteModal";
import DeleteModal from "../modals/DeleteModal";
import placeType from "@/app/function/placeType";

interface ResidencesBoxProps {
    key: number;
    residence: Residencia;
}

const ResidencesBox: React.FC<ResidencesBoxProps> = ({
    residence
}) => {
    
    const router = useRouter();
    const placeModal = usePlaceModal();
    const residenceModal = useResidenceUpdateModal();
    const deleteModal = useDeleteModal();

    const { 
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues:{
            id: residence.id
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        
        axios.post('/api/repime/residencia/remove', data)
        .then((response) => {
            toast.success(response.data.repime.msg_ret);
            deleteModal.onClose()
            router.refresh();
            
        })
        .catch(() => {
            toast.error('Algo deu errado');
        })
    }

    const handleInsertVaga = () => {
        placeModal.setResidenceId(Number(residence.id));
        placeModal.onOpen();
    };
    
    const handleAtualizarResidencia = () => {
        residenceModal.setResidenceId(Number(residence.id));
        residenceModal.onOpen();
    };

    const tipo = placeType(residence.tipo, true);
    

    return (
        <>
        <div className="m-2 p-4 max-w-screen-lg mx-auto border-[2px] border-zinc-400 rounded-2xl">
            <div className="flex flex-col gap-6">
                <div className="flow-root">
                    <div className="float-left">
                        <Heading 
                            title={tipo + residence.nome}
                            subtitle={`${residence.end_rua} ${residence.end_numero}, ${residence.end_bairro}`}
                        />
                    </div>
                    
                    <div className="float-right">
                        <div className="flex flex-row gap-4 py-4 items-center">
                            <div className="border-repimehardblue border-[3px] font-bold rounded-3xl p-1">
                                <button onClick={handleAtualizarResidencia}>Atualizar</button>
                            </div>
                            
                            <div className="border-repimehardblue border-[3px] font-bold rounded-3xl p-1">
                                <button onClick={handleInsertVaga}>Inserir vaga</button>
                            </div>

                            <div className="border-repimepink border-[3px] font-bold rounded-3xl p-1">
                                <button onClick={deleteModal.onOpen}>Deletar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <DeleteModal onSubmit={handleSubmit(onSubmit)}/>
        </>
    );
}

export default ResidencesBox;