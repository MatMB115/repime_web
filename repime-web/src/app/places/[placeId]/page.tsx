import getCurrentUser from "@/app/actions/getCurrentUser";
import getPlaceById from "@/app/actions/getPlacesById";
import ClienteOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import PlaceClient from "./PlaceClient";

interface IParams {
    placeId?: string;
}

const PlacePage = async ({ params }: { params: Promise<IParams> }) => {
    const resolvedParams = await params;
    const place = await getPlaceById(resolvedParams);
    const currentUser = await getCurrentUser();

    if (!place) {
        return (
            <ClienteOnly>
                <EmptyState />
            </ClienteOnly>
        )
    }

    return (
        <ClienteOnly>
            <PlaceClient
                place={place}
                currentUser={currentUser}
            />
        </ClienteOnly>
    );
}

export default PlacePage;
