import axios from 'axios';

export interface Coordinates {
  lat: number;
  lng: number;
}

export const GeocodingService = {
  async getCoordinates(address: string): Promise<Coordinates | null> {
    const apiKey = process.env.GOOGLE_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    
    if (!apiKey) {
      console.error("ERRO: API Key do Google não configurada no ambiente.");
      return null;
    }

    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address,
          key: apiKey
        }
      });

      if (response.data.status === 'OK' && response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        return { lat, lng };
      }

      console.warn(`Geocoding: Endereço não encontrado ou limite atingido: ${address} [Status: ${response.data.status}]`);
      return null;
    } catch (error) {
      console.error(`Erro na chamada Geocoding API para ${address}:`, error);
      return null;
    }
  }
};
