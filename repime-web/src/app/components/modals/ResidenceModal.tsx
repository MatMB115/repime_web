'use client';
import { useMemo, useState } from "react";

import useResidenceModal from "@/app/hooks/useResidenceModal";

import Modal from "./Modal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CitySelect from "../inputs/CitySelect";
import Input from "../inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { User } from '@prisma/client';
import InputCheckbox from "../inputs/InputCheckbox";
import ClienteOnly from "../ClientOnly";
import EmptyState from "../EmptyState";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
}

interface ResidenceModalProps {
    currentUser?: User | null;
}

const ResidenceModal: React.FC<ResidenceModalProps> = ({
    currentUser
}) => {
    const residenceModal = useResidenceModal();
    const router = useRouter();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

    if (!currentUser) {
        return (
            <ClienteOnly>
                <EmptyState />
            </ClienteOnly>
        )
    }

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            usuario: {
                id_usuario: currentUser?.id,
            },
            cidade: {
                id_cidade: '',
            },
            residencia: {
                nome: '',
                e_mobiliado: false,
                tem_garagem: false,
                tem_animais: false,
                tem_empregada: false,
                oferece_almoco: false,
                oferece_janta: false,
            },
            endereco: {
                end_numero: '',
                end_rua: '',
                end_bairro: '',
                end_complemento: '',
                end_cep: '',
            },
            republica: {
                fundacao: '',
                tem_trote: false,
                e_masculina: false
            }
        }
    });

    const category = watch('category')
    const location = watch('cidade.id_cidade')
    
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
        if (step === STEPS.INFO){
            return "Criar";
        }

        return "Próxima"
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY){
            return undefined;
        }

        return "Voltar";
    }, [step]);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.INFO){
            return onNext();
        }

        setIsLoading(true);

        axios.post('/api/repime/residencia/republica/register', data)
        .then((response) => {
            toast.success('Sucesso! ' + response.data.repime.msg_ret);
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            residenceModal.onClose();
        })
        .catch(() => {
            toast.error('Algo deu errado');
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Descreva sua residência"
                subtitle="Escolha a categoria"
            />
            <div
                className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-3
                max-h-[50vh]
                overflow-y-auto
                "
            >
                <div key={categories[3].label} className="col-span-1">
                    <CategoryInput
                        onClick={(category) => setCustomValue('category', category)}
                        selected={category === categories[3].label}
                        label={categories[3].label}
                        icon={categories[3].icon}
                    />
                </div>
                <div key={categories[4].label} className="col-span-1">
                    <CategoryInput 
                        onClick={(category) => setCustomValue('category', category)}
                        selected={category === categories[4].label}
                        label={categories[4].label}
                        icon={categories[4].icon}
                    />
                </div>
            </div>
        </div>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-2">
                <Heading 
                    title="Qual o endereço da residência?"
                    subtitle="Informe os detalhes da localização"
                />
                <div className=" flex flex-col gap-4">
                    <Input 
                        id="endereco.end_rua"
                        type="text"
                        label="Rua"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    <Input 
                        id="endereco.end_bairro"
                        type="text"
                        label="Bairro"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    <Input 
                        id="endereco.end_complemento"
                        type="text"
                        label="Complemento"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    <div className="flex flex-row gap-3">
                        <Input 
                            id="endereco.end_cep"
                            type="text"
                            label="CEP"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                        />
                        <Input 
                            id="endereco.end_numero"
                            type="number"
                            label="Número"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                        />
                    </div>
                </div>
                
                
                <CitySelect 
                    value={location}
                    onChange={(value) => setCustomValue('cidade', value)}
                />
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="Quais as características da república?"
                    subtitle="Nos diga mais sobre sua residência"
                />
                <Input 
                    id="residencia.nome"
                    type="text"
                    label="Nome"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <Input 
                    id="republica.fundacao"
                    type="date"
                    label="Data de fundação"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                />
                <div className="flex flex-col gap-2 text-xl">
                    <div className="flex flex-row gap-4 justify-center">
                        <InputCheckbox 
                            id="residencia.tem_garagem"
                            type="checkbox"
                            label="Tem garagem"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                        />
                        <InputCheckbox 
                            id="residencia.tem_empregada"
                            type="checkbox"
                            label="Tem empregada"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                        />
                    </div>
                    <div className="flex flex-row gap-4 justify-center">
                        <InputCheckbox 
                            id="residencia.tem_animais"
                            type="checkbox"
                            label="Tem animais"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                        />
                        <InputCheckbox 
                            id="residencia.e_mobiliado"
                            type="checkbox"
                            label="É mobiliado"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                        />
                    </div>
                    <div className="flex flex-row gap-4 justify-center">
                        <InputCheckbox 
                            id="residencia.oferece_almoco"
                            type="checkbox"
                            label="Oferece almoço"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                        />
                        <InputCheckbox 
                            id="residencia.oferece_janta"
                            type="checkbox"
                            label="Oferece janta"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                        />
                    </div>
                    <div className="flex flex-row gap-4 justify-center">
                        <InputCheckbox 
                            id="republica.e_masculina"
                            type="checkbox"
                            label="República masculina"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                        />
                        <InputCheckbox 
                            id="republica.tem_trote"
                            type="checkbox"
                            label="Tradição de trotes"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                        />
                    </div>
                </div>
            </div>
        )
    }

    return ( 
        <Modal 
            isOpen={residenceModal.isOpen}
            onClose={residenceModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            title="Cadastre sua residência"
            body={bodyContent}
        />
    );
}
 
export default ResidenceModal;