'use client';
import { useMemo, useState } from "react";
import Modal from "./Modal";
import Heading from "../Heading";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import ImageUpload from "../inputs/ImageUpload";
import usePlaceModal from "@/app/hooks/usePlaceModal";
import InputCheckbox from "../inputs/InputCheckbox";

enum STEPS {
    DESCRIPTION = 0,
    IMAGE = 1
}

const PlaceModal = () => {
    const placeModal = usePlaceModal();
    const router = useRouter();
    const [step, setStep] = useState(STEPS.DESCRIPTION);
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
            fotoVaga: {
                foto: '',
            },
            descricao: '',
            mensalidade: '',
            e_mobiliado: false
        }
    });

    const imgSrc = watch('fotoVaga.foto');

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
            return "Criar";
        }

        return "Próxima"
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.DESCRIPTION){
            return undefined;
        }
        return "Voltar";
    }, [step]);

    const handleSecondaryAction = useMemo(() => {
        if (step === STEPS.DESCRIPTION){
            return undefined;
        }
        else {
            return onBack;
        }
    }, [step]);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.IMAGE) {
            return onNext();
        }
        setIsLoading(true);

        data.tb_residencia = Number(placeModal.residenceId);

        axios.post('/api/repime/residencia/vagas/register', data)
        .then((response) => {
            toast.success('Sucesso! ' + response.data.repime.msg_ret);
            router.refresh();
            reset();
            setStep(STEPS.DESCRIPTION);
            placeModal.onClose();
        })
        .catch(() => {
            toast.error('Algo deu errado');
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    let bodyContent = (
        <div className="flex flex-col gap-2">
            <Heading 
                title="Nos diga mais sobre sua vaga"
                subtitle="Informe os detalhes da sua vaga"
            />
            <div className=" flex flex-col gap-4">
                <Input 
                    id="mensalidade"
                    type="number"
                    label="Mensalidade"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <Input 
                    id="descricao"
                    type="text"
                    label="Informações adicionais sobre sua vaga"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <div className="flex flex-row gap-4 justify-center text-xl">
                    <InputCheckbox 
                    id="e_mobiliado"
                    type="checkbox"
                    label="É mobiliada"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    />
                </div>
            </div>
        </div>
    )
    
    if (step === STEPS.IMAGE) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="Adicione uma foto da sua vaga"
              subtitle="Mostre aos visitantes como sua vaga é"
            />
            <ImageUpload
              onChange={(value) => setCustomValue('fotoVaga.foto', value)}
              value={imgSrc}
            />
          </div>
        )
    }

    return ( 
        <Modal 
            isOpen={placeModal.isOpen}
            onClose={placeModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={handleSecondaryAction}
            title="Cadastre sua vaga"
            body={bodyContent}
        />
    );
}
 
export default PlaceModal;