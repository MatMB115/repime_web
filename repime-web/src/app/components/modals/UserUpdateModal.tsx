'use client'

import axios from 'axios';
import { useMemo, useState } from 'react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";

import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import validator from 'validator';
import { User } from "@prisma/client"
import useUserUpdateModal from '@/app/hooks/useUserUpdateModal';
import ImageUpload from "../inputs/ImageUpload";
import { signOut } from "next-auth/react";

enum STEPS {
    INFO = 0,
    IMAGE = 1
}

interface UserEditModalProps {
    currentUser: User | null;
}

const UserEditModal: React.FC<UserEditModalProps> = ({
    currentUser
}) => {
    const userEditModal = useUserUpdateModal();
    const [step, setStep] = useState(STEPS.INFO);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register, 
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            id: currentUser?.id || "",
            nome: currentUser?.name || "",
            email: currentUser?.email || "",
            senha: "",
            contato: currentUser?.contato || "",
            nome_contato: currentUser?.nome_contato || "",
            foto: currentUser?.image || ""
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        if (step !== STEPS.IMAGE) {
            return onNext();
        }
        setIsLoading(true);
        
        let validData = true;
        if(!validator.isMobilePhone(data.contato, 'pt-BR')) {
            toast.error('Contato inválido!');
            validData = false;
        }

        // Só valida força da senha se ela for preenchida
        if(data.senha && !validator.isStrongPassword(data.senha)) {
            toast.error("Senha muito fraca! Use letras maiúsculas, minúsculas, números e símbolos.");
            validData = false;
        }
        
        if(validData) {
            axios.put('/api/repime/user/update', data)
            .then(() => {
                toast.success('Perfil atualizado com sucesso. Faça login novamente.');
                userEditModal.onClose();
                signOut()
            })
            .catch((err) => {
                const message = err.response?.data?.repime?.msg_ret || err.message;
                toast.error('Algo deu errado: ' + message);
            })
        }
        setIsLoading(false);
    }

    const imgSrc = watch('foto');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }

    const onBack = () => {
        setStep((value) => value -1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    };

    const actionLabel = useMemo(() => {
        if (step === STEPS.IMAGE){
            return "Atualizar";
        }

        return "Próxima"
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.INFO){
            return undefined;
        }
        return "Voltar";
    }, [step]);

    const handleSecondaryAction = useMemo(() => {
        if (step === STEPS.INFO){
            return undefined;
        }
        else {
            return onBack;
        }
    }, [step]);
    
    let bodyContent = (
        <div className="flex flex-col gap-2">
            <Heading
                title="Bem vindo ao RepiME"
                subtitle="Atualize seu perfil"
                center
            />

            <Input 
                id="nome"
                type="text"
                label="Nome"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />

            <Input 
                id="senha"
                type="password"
                label="Senha"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id="contato"
                type="text"
                label="Contato"
                disabled={isLoading}
                register={register}
                errors={errors}
                placeholder='XX YYYYYYYYY'
                required
            />
            <Input 
                id="nome_contato"
                type="text"
                label="Nome do contato no WhatsApp"
                disabled={isLoading}
                register={register}
                errors={errors}
            />
        </div>
    )

    if (step === STEPS.IMAGE) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="Adicione sua foto de perfil"
              subtitle="Mostre quem é você aos visitantes das suas vagas"
            />
            <ImageUpload
              onChange={(value) => setCustomValue('foto', value)}
              value={imgSrc}
            />
          </div>
        )
    }

    return (
        <Modal 
            disabled={isLoading}
            isOpen={userEditModal.isOpen}
            title="Atualize seu perfil de cadastro"
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={handleSecondaryAction}
            onClose={userEditModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            submitOnEnter
            body={bodyContent}
            medium
        />
    );
}
 
export default UserEditModal;
