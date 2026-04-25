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
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';
import validator from 'validator';

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState(false);

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
            confirmarSenha: '',
            contato: '',
            nome_contato: ''
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
            setIsInvalid(true);
            validData = false;
        } else {
            setIsInvalid(false);
        }

        if(data.senha !== data.confirmarSenha) {
            toast.error('As senhas não coincidem!');
            setPasswordMismatch(true);
            validData = false;
        } else {
            setPasswordMismatch(false);
        }
        
        if(validData) {
            const { confirmarSenha, ...registerData } = data;

            axios.post('/api/register', registerData)
            .then(() => {
                toast.success('Cadastro efetuado com sucesso');
                registerModal.onClose();
                loginModal.onOpen();
                setIsInvalid(false);
                setPasswordMismatch(false);
            })
            .catch((err) =>{
                const message = err.response?.data?.message ?? err.message;
                toast.error('Algo deu errado: ' + message);
            })
            .finally(() => {
                setIsLoading(false);
            });
            return;
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
            />

            <Input 
                id="nome"
                type="text"
                label="Nome"
                disabled={isLoading}
                register={register}
                errors={errors}
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
            <div className={`text-sm text-center ${isInvalid ? 'text-repimepink font-semibold' : 'text-neutral-500'}`}>
                A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.
            </div>
            <Input 
                id="confirmarSenha"
                type="password"
                label="Confirmar senha"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            {passwordMismatch && (
                <div className='text-sm text-repimepink font-semibold text-center'>
                    As senhas precisam ser iguais.
                </div>
            )}
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
            submitOnEnter
            body={bodyContent}
            footer={footerContent}
        />
    );
}
 
export default RegisterModal;
