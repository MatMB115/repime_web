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
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_API_KEY as string
    })

    const [map, setMap] = React.useState(null)
    let positions = [];

    const onLoad = React.useCallback(function (map) {
        const geocoder = new window.google.maps.Geocoder();

        getAddressResidencia(addressPlace, addressUniversity, map, positions, geocoder)

    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
        positions = []
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            onLoad={onLoad}
            zoom={6}
            onUnmount={onUnmount}
        >
            {
            }
        </GoogleMap>
    ) : <></>
}

export default GoogleMapsComponent;

function getAddressResidencia(address: string, addressUniversity: string, map: any, positions, geocoder) {
    console.log(address);
    geocoder.geocode({ address }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
            const { location } = results![0].geometry;

            const marker = {
                map: map,
                position: results![0].geometry.location,
                icon: "/images/house_icon.png",
            };
            positions.push({ lat: location.lat(), lng: location.lng() });
            new google.maps.Marker(marker);
            getAddressUniversidade(addressUniversity, map, positions, geocoder)
        }
    });
}

function getAddressUniversidade(address: string, map: any, positions: any, geocoder) {
    console.log(address);
    geocoder.geocode({ address }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
            const { location } = results![0].geometry;

            const marker = {
                position: results![0].geometry.location,
                map: map, icon: "/images/university_icon.png"
            };
            positions.push({ lat: location.lat(), lng: location.lng() });
            new google.maps.Marker(marker);
            centralizeMaps();
        }
        function centralizeMaps() {
            const centerLat = (positions[0].lat + positions[1].lat) / 2;
            const centerLng = (positions[0].lng + positions[1].lng) / 2;
            const bounds = new window.google.maps.LatLngBounds({ lat: centerLat, lng: centerLng });
            map.fitBounds(bounds);
            map.setZoom(14)
        }
    });
}


