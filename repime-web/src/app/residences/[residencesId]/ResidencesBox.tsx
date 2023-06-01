'use client'

import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import { Residencia } from "@prisma/client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface ResidencesBoxProps {
    residence: Residencia | null;
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
            id: residence?.id
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
        <Container>
            <div className="max-w-screen-lg mx-auto">
                {residence ? (
                    <div className="flex flex-col gap-6">
                        <div className="flow-root">
                            <div className="float-left">
                                <Heading 
                                    title={residence.nome}
                                    subtitle={`${residence.end_rua} ${residence.end_numero}, ${residence.end_bairro}`}
                                />
                            </div>
                            
                            <div className="float-right">
                                <div className="flex flex-col gap-1 items-center">
                                    <div className="h-8 p-1 bg-repimeblue rounded-3xl">
                                        <button>Update</button>
                                    </div>
                                    
                                    <div className="h-8 p-1 bg-repimepink rounded-3xl">
                                        <button onClick={handleSubmit(onSubmit)}>Delete</button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div 
                    className="
                        flex
                        flex-col
                        items-center
                        justify-center
                        h-screen 
                        text-3xl
                        "
                    >
                        Cadastre sua residência
                        <div className="text-xl text-zinc-400 underline">
                            Não há vagas encontradas
                        </div>
                    </div>
                )}
            </div>
        </Container>
    );
}

export default ResidencesBox;