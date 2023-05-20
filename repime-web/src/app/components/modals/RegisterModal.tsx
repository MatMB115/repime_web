'use client'

import axios from 'axios';
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from 'react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";

import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Input';
import toast from 'react-hot-toast';
import Button from '../Button';

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register, 
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues:{
            email: '',
            nome: '',
            senha: '',
            contato: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose();
            })
            .catch((error) =>{
                toast.error(error.value);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const bodyContent = (
        <div className="flex flex-col gap-">
            <Heading
                title="Bem vindo ao RepiME"
                subtitle="Crie uma conta"
                center
            />
            <Input 
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />

            <Input 
                id="nome"
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
                label="Contato"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-2 mt-3">
            <hr />
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle} 
                onClick={() => {}}
            />
            <Button
                outline
                label="Continue with Github"
                icon={AiFillGithub} 
                onClick={() => {}}
            />
            <div
                className="
                    text-neutral-500
                    text-center
                    mt-4
                    font-light
                "
            >
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>
                        Já possui um cadastro?
                    </div>
                    <div   
                        onClick={registerModal.onClose}
                        className="
                            text-neutral-800 
                            cursor-pointer 
                            hover:underline
                        "
                        >
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal 
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Cadastro"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}
 
export default RegisterModal;