'use client'
import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import DeleteModal from "@/app/components/modals/DeleteModal";
import PlaceHead from "@/app/components/places/PlaceHead";
import PlaceInfo from "@/app/components/places/PlaceInfo";
import useDeleteModal from "@/app/hooks/useDeleteModal";
import { User, place_page } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import GoogleMapsComponent from "@/app/components/MapsComponent"
import { usePlaceDetails } from "@/app/hooks/usePlaceDetails";

type PlaceClientData = place_page & {
    fotos?: string[];
    titulo?: string | null;
    residencia_descricao?: string | null;
}

interface PlaceClientProps {
    place: PlaceClientData | null;
    currentUser?: User | null;
}

const PlaceClient: React.FC<PlaceClientProps> = ({
    place,
    currentUser
}) => {
    const router = useRouter();
    const deleteModal = useDeleteModal();
    const placeDetails = usePlaceDetails(place, currentUser);

    const {
        handleSubmit,
    } = useForm<FieldValues>({
        defaultValues: {
            id: place?.id_vaga
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {

        axios.post('/api/repime/residencia/vagas/remove', data)
            .then((response) => {
                toast.success(response.data.repime.msg_ret);
                deleteModal.onClose()
                router.push('/');
            })
            .catch(() => {
                toast.error('Algo deu errado');
            })
    }

    return (
        <Container>

            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <PlaceHead
                        title={place?.titulo || `${place?.end_rua} ${place?.end_numero} ${place?.end_complemento} em ${place?.end_bairro} - ${place?.cidade_nome}`}
                        imageSrc={place!.foto}
                        images={place?.fotos}
                        userName={place?.name}
                        locationValue={`${place?.end_cep} - ${place?.pais}, ${place?.uf}`}
                        id={place!.id_vaga}
                        currentUser={currentUser!}
                    />
                    <div
                        className="
                            grid
                            grid-cols-1
                            md:grid-cols-7
                            md:gap-10
                            mt-6
                        "
                    >
                        <PlaceInfo
                            placeName={place?.residencia_nome!}
                            hostName={place?.name!}
                            hostImg={place?.image!}
                            vagaDescription={place?.descricao}
                            residenciaDescription={place?.residencia_descricao}
                            hasGarage={place?.tem_garagem!}
                            burgh={place?.end_bairro!}
                            complement={place?.end_complemento!}
                            hasPets={place?.tem_animais!}
                            hasLunch={place?.oferece_almoco!}
                            hasDinner={place?.oferece_janta!}
                            hasPranks={place?.tem_trote!}
                            hasDiarist={place?.tem_diarista!}
                            isRep={placeDetails.isRep}
                            contato={place?.contato!}
                            contract={place?.tempo_de_contrato!}
                            walkToUnifei={place?.tempo_unifei}
                            walkToCenter={place?.tempo_centro}
                            internetMbps={place?.internet_mbps}
                            instagramHref={placeDetails.instagramHref}
                            includeWater={place?.agua_inclusa!}
                            includeInternet={place?.internet_inclusa!}
                            includeEnergy={place?.energia_inclusa!}
                        />
                        <div
                            className="
                                order-first 
                                mb-10 
                                md:order-last 
                                md:col-span-3
                            "
                        >
                            <div
                                className="
                                bg-white 
                                    rounded-xl 
                                    border-[1px]
                                border-neutral-200 
                                    overflow-hidden
                                "
                            >
                                <div className="
                                flex flex-row items-center gap-1 p-4">
                                    <div className="text-2xl font-semibold">
                                        R${place?.mensalidade}
                                    </div>
                                    <div className="font-light text-neutral-600">
                                        mês
                                    </div>
                                </div>
                                <hr />
                                <div className="p-4">
                                    <div className="p-2">
                                        <Link href={placeDetails.contactHref} target="_blank">
                                            <Button
                                                label={placeDetails.contactLabel}
                                                onClick={() => { }}
                                            />
                                        </Link>
                                    </div>
                                    <div className="p-2">
                                        {placeDetails.isOwner && (
                                            <>
                                                <Button
                                                    label="Delete"
                                                    onClick={deleteModal.onOpen}
                                                    pink
                                                />
                                                <DeleteModal onSubmit={handleSubmit(onSubmit)} />
                                            </>

                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <GoogleMapsComponent
                        lat={place?.lat}
                        lng={place?.lng}
                    />
                </div>
            </div>
        </Container>
    );
}

export default PlaceClient;
