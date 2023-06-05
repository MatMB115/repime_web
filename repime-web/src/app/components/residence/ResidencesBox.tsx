'use client'

import Heading from "@/app/components/Heading";
import { Residencia } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface ResidencesBoxProps {
    residence: Residencia;
}

const ResidencesBox: React.FC<ResidencesBoxProps> = ({
    residence
}) => {
    
    const router = useRouter();

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
        
        axios.post('/api/repime/residencia/republica/remove', data)
        .then((response) => {
            toast.success(response.data.repime.msg_ret);
            router.refresh();
        })
        .catch(() => {
            toast.error('Algo deu errado');
        })
    }

    return (
        <div className="m-2 p-4 max-w-screen-lg mx-auto border-[1px] border-zinc-400 rounded-2xl">
            <div className="flex flex-col gap-6">
                <div className="flow-root">
                    <div className="float-left">
                        <Heading 
                            title={residence.nome}
                            subtitle={`${residence.end_rua} ${residence.end_numero}, ${residence.end_bairro}`}
                        />
                    </div>
                    
                    <div className="float-right">
                        <div className="flex flex-col gap-4 items-center">
                            <div className="bg-repimeblue rounded-3xl p-1">
                                <button>Update</button>
                            </div>
                            
                            <div className="bg-repimepink rounded-3xl p-1">
                                <button onClick={handleSubmit(onSubmit)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResidencesBox;