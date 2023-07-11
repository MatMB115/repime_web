import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';


interface GoogleMapsProps {
    addressUniversity: string;
    addressPlace: string;
}

const containerStyle = {
    height: '700px'
};

const GoogleMapsComponent: React.FC<GoogleMapsProps> = (
    { addressUniversity,
        addressPlace }

) => {
    console.log(process.env.GOOGLE_MAPS_API as string);
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.GOOGLE_CLIENT_API_KEY as string
    })

    const [map, setMap] = React.useState(null)
    let positions = [];

    const onLoad = React.useCallback(function callback(map) {
        const geocoder = new window.google.maps.Geocoder();
        getAddress(geocoder, addressPlace, map, positions, false);
        getAddress(geocoder, addressUniversity, map, positions, true);

    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
        positions = []
    }, [])
    const options = {
        minZoom: 8,
        maxZoom: 15,
    }
    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            onLoad={onLoad}
            options={options}
            onUnmount={onUnmount}
        >
            {
            }
        </GoogleMap>
    ) : <></>
}

export default GoogleMapsComponent;

function getAddress(geocoder: google.maps.Geocoder, address: string, map: any, positions, center: boolean) {
    geocoder.geocode({ address }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
            const { location } = results![0].geometry;

            const marker = {
                map: map,
                position: results![0].geometry.location
            };
            positions.push({ lat: location.lat(), lng: location.lng() });
            new google.maps.Marker(marker);
            if (!center) return;
            console.log(positions);
            const bounds = new window.google.maps.LatLngBounds({ lat: (positions[0].lat + positions[1].lat) / 2, lng: (positions[0].lng + positions[1].lng) / 2 });
            map.fitBounds(bounds);
        }
    });
}
