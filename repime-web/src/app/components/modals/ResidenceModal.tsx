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
import RepTypeSelect from "../inputs/RepTypeSelect";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFOREPUBLICA = 2,
    INFOKITNET = 3
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
                tem_garagem: false,
                tipo: '',
                end_numero: '',
                end_rua: '',
                end_bairro: '',
                end_complemento: '',
                end_cep: '',
                tem_animais: false,
                oferece_almoco: false,
                oferece_janta: false,
                fundacao: null,
                tem_trote: false,
                tem_diarista: false,
                tempo_de_contrato: 0,
                agua_inclusa: false,
                internet_inclusa: false,
                energia_inclusa: false
            },
            republica: {
                tipo: null
            }
        }
    });

    const category = watch('residencia.tipo')
    const location = watch('cidade.id_cidade')
    const repType = watch('republica.tipo')

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

    const onBackKitnet = () => {
        setStep((value) => value - 2);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    };

    const onNextKitnet = () => {
        setStep((value) => value + 2);
    }
    const actionLabel = useMemo(() => {
        if (step === STEPS.INFOREPUBLICA){
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

    const handleSecondaryAction = useMemo(() => {
        if (step === STEPS.CATEGORY){
            return undefined;
        }
        else if (step === STEPS.INFOKITNET) {
            return onBackKitnet;
        }
        else {
            return onBack;
        }
    }, [step]);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.INFOREPUBLICA && step !== STEPS.INFOKITNET) {
            if(step === STEPS.LOCATION && category === 'Kitnets') {
                return onNextKitnet();
            }
            return onNext();
        }
        
        setIsLoading(true);

        axios.post('/api/repime/residencia/register', data)
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
                        onClick={(category) => setCustomValue('residencia.tipo', category)}
                        selected={category === categories[3].label}
                        label={categories[3].label}
                        icon={categories[3].icon}
                    />
                </div>
                <div key={categories[4].label} className="col-span-1">
                    <CategoryInput 
                        onClick={(category) => setCustomValue('residencia.tipo', category)}
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
                        id="residencia.end_rua"
                        type="text"
                        label="Rua"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    <Input 
                        id="residencia.end_bairro"
                        type="text"
                        label="Bairro"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    <Input 
                        id="residencia.end_complemento"
                        type="text"
                        label="Complemento"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    <div className="flex flex-row gap-3">
                        <Input 
                            id="residencia.end_cep"
                            type="text"
                            label="CEP"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                        />
                        <Input 
                            id="residencia.end_numero"
                            type="number"
                            label="Número"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
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

    if (step === STEPS.INFOREPUBLICA) {
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
                    id="residencia.fundacao"
                    type="date"
                    label="Data de fundação"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                />

                <RepTypeSelect 
                    value={repType}
                    onChange={(value) => setCustomValue('republica.tipo', value)}
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
                            id="residencia.tem_diarista"
                            type="checkbox"
                            label="Tem diarista"
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
                            id="residencia.tem_trote"
                            type="checkbox"
                            label="Tem trotes"
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
                    
                </div>
            </div>
        )
    }

    if (step === STEPS.INFOKITNET) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="Quais as características das kitnets?"
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
                    id="residencia.tempo_de_contrato"
                    type="number"
                    label="Tempo de contrato (em meses)"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                />
                <div className="flex flex-col gap-2 text-lg">
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
                            id="residencia.internet_inclusa"
                            type="checkbox"
                            label="Internet inclusa no valor"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                        />
                    </div>
                    <div className="flex flex-row gap-4 justify-center">
                        <InputCheckbox 
                            id="residencia.energia_inclusa"
                            type="checkbox"
                            label="Energia inclusa no valor"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                        />
                        <InputCheckbox 
                            id="residencia.agua_inclusa"
                            type="checkbox"
                            label="Água inclusa no valor"
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
            secondaryAction={handleSecondaryAction}
            title="Cadastre sua residência"
            body={bodyContent}
        />
    );
}
 
export default ResidenceModal;