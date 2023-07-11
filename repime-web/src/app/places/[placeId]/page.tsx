import getCurrentUser from "@/app/actions/getCurrentUser";
import getPlaceById from "@/app/actions/getPlacesById";
import ClienteOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import PlaceClient from "./PlaceClient";
import { GoogleMap, InfoWindowF, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";

interface IParams {
    placeId?: number;
}

const PlacePage = async ({ params }: { params: IParams }) => {
    const place = await getPlaceById(params);
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