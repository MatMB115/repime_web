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
import { useRouter } from 'next/navigation';

const LoginModal = () => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const LoginModal = useLoginModal();
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
            senha: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false,
        })
        .then((callback) =>{
            setIsLoading(false);

            if(callback?.ok){
                toast.success('Logged in');
                router.refresh();
                LoginModal.onClose();
            }

            if(callback?.error){
                toast.error(callback.error);
            }
        })
    }

    const bodyContent = (
        <div className="flex flex-col gap-2">
            <Heading
                title="Estamos felizes em revê-lo!"
                subtitle="Entre com sua conta"
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
                id="senha"
                type="password"
                label="Senha"
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
            isOpen={LoginModal.isOpen}
            title="Entrar"
            actionLabel="Continue"
            onClose={LoginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}
 
export default LoginModal;