'use client'

import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

interface MapsProps {
  lat?: number | null;
  lng?: number | null;
}

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '12px'
};

// Coordenadas fixas da UNIFEI Itajubá
const UNIFEI_COORDS = {
  lat: -22.414705,
  lng: -45.449742
};

const GoogleMapsComponent: React.FC<MapsProps> = ({ lat, lng }) => {
  const [response, setResponse] = useState<google.maps.DirectionsResult | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string
  });

  // Limpa a rota se as coordenadas mudarem
  useEffect(() => {
    setResponse(null);
  }, [lat, lng]);

  if (!isLoaded) {
    return (
      <div className="h-[400px] w-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-neutral-400">
        Carregando mapa...
      </div>
    );
  }

  if (!lat || !lng) {
    return (
      <div className="h-[400px] w-full bg-gray-100 rounded-xl flex items-center justify-center text-neutral-500 italic">
        Localização não disponível para esta vaga.
      </div>
    );
  }

  const origin = { lat, lng };

  const directionsCallback = (
    res: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => {
    if (res !== null && status === 'OK' && !response) {
      setResponse(res);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={origin}
        zoom={15}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
        }}
      >
        {/* Renderiza a rota se disponível */}
        {response && (
          <DirectionsRenderer
            options={{
              directions: response,
              suppressMarkers: false, // Mantém os marcadores padrão A e B
            }}
          />
        )}

        {/* Solicita a rota a pé até a UNIFEI */}
        {!response && (
          <DirectionsService
            options={{
              destination: UNIFEI_COORDS,
              origin: origin,
              travelMode: google.maps.TravelMode.WALKING
            }}
            callback={directionsCallback}
          />
        )}

        {/* Marcador de fallback caso a rota falhe */}
        {!response && <MarkerF position={origin} />}
      </GoogleMap>
      
      {response && response.routes[0].legs[0] && (
        <div className="text-sm font-medium text-neutral-600 flex justify-between px-2">
          <span>Distância até a UNIFEI: <b>{response.routes[0].legs[0].distance?.text}</b></span>
          <span>Tempo estimado a pé: <b>{response.routes[0].legs[0].duration?.text}</b></span>
        </div>
      )}
    </div>
  );
};

export default GoogleMapsComponent;
