'use client'

import { signIn } from 'next-auth/react';
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
import useLoginModal from '@/app/hooks/useLoginModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Input';
import toast from 'react-hot-toast';
import Button from '../Button';
import validator from 'validator';

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
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
        
        let validData = true;

        if(!validator.isEmail(data.email)) {
            toast.error('Email inválido!');
            validData = false;
        }

        if(!validator.isMobilePhone(data.contato, 'pt-BR')) {
            toast.error('Contato inválido!');
            validData = false;
        }

        if(!validator.isStrongPassword(data.senha)) {
            toast.error("Senha muito fraca!");
            validData = false;
        }
        
        if(validData) {
            axios.post('/api/repime/user/register/', data)
            .then((response) => {
                if(response.data.repime.cod_ret != 0){
                    throw new Error();
                }
                toast.success('Cadastro efetuado com sucesso');
                registerModal.onClose();
            })
            .catch((err) =>{
                toast.error('Algo deu errado: ' + err);
            })
        }
        setIsLoading(false);
    }
    
    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal]);


    const bodyContent = (
        <div className="flex flex-col gap-2">
            <Heading
                title="Bem vindo ao RepiME"
                subtitle="Crie uma conta"
                center
            />
            <Input 
                id="email"
                type="text"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
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
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-2 mt-3">
            <hr />
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle} 
                onClick={() => signIn('google')}
            />
            <Button
                outline
                label="Continue with Github"
                icon={AiFillGithub} 
                onClick={() => signIn('github')}
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
                        onClick={toggle}
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