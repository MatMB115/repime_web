import axios from "axios";

export interface ResidenceParam {
  id_usuario?: string;
}

export default async function getResidenceUser(id_usuario: string | undefined) {
  try {
    const response = await axios.get('http://localhost:3000/api/repime/residencia/get_per_user', {
      params: {
        id_usuario: id_usuario
      }
    });
    if(response.data.repime.result.residencias.length == 0){
      return null;
    }
    return response.data.repime.result.residencias[0]; //sapoha é um array caralho
  } catch (err) {
    console.log(err);
    return null
  }
}