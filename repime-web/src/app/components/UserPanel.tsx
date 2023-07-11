'use client'

import Container from "@/app/components/Container";
import PanelHead from "@/app/components/PanelHead";
import { User } from "@prisma/client";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useUserUpdateModal from "@/app/hooks/useUserUpdateModal";
import DeleteModal from "./modals/DeleteModal";
import useDeleteModal from "../hooks/useDeleteModal";

interface UserPanelProps {
    currentUser?: User | null;
}

const UserPanel: React.FC<UserPanelProps> = ({
    currentUser
}) => {
    const router = useRouter();
    const userUpdateModal = useUserUpdateModal();
    const deleteModal = useDeleteModal();

    const { 
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues:{
            id_usuario: currentUser?.id
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        
        axios.post('/api/repime/user/remove', data)
        .then((response) => {
            toast.success(response.data.repime.msg_ret);
            deleteModal.onClose()
            signOut();
            return router.push('/');
        })
        .catch(() => {
            toast.error('Algo deu errado');
        })
    }
    
    return ( 
        <>
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6 items-center">
                    <PanelHead 
                        title={"Perfil do Usuário"}
                        imageSrc={currentUser?.image || '/images/placeholder.jpg'}
                    />
                </div>
                <div
                    className="
                        flex
                        flex-col
                        h-[50vh]
                        p-6
                        text-xl
                        text-zinc-700
                        items-center
                    "
                >
                    <div className="p-6 border-[2px] border-zinc-400 rounded-lg m-4">
                        <div>
                            Usuário da sessão: {currentUser?.name}
                        </div>
                        <hr className="border-zinc-400"/>
                        <div>
                            Email: {currentUser?.email}
                        </div>
                        <hr className="border-zinc-400"/>
                        <div>
                            Contato: {currentUser?.contato}
                        </div>
                    </div>

                    <div className="flex flex-row gap-4 py-4 items-center">
                        <div className="p-3 border-repimehardblue border-[3px] text-repimehardblue font-bold rounded-3xl">
                            <button onClick={userUpdateModal.onOpen}>Atualizar Conta</button>
                        </div>
                        <div className="p-3 border-repimepink border-[3px] text-repimepink font-bold rounded-3xl">
                            <button onClick={deleteModal.onOpen}>Deletar Conta</button>
                        </div>
                    </div>  
                </div> 
            </div>
        </Container>
        <DeleteModal onSubmit={handleSubmit(onSubmit)} />
        </>
    );
}
 
export default UserPanel;