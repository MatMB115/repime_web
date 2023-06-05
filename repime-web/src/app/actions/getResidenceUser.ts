import axios from "axios";

export interface ResidenceParam {
  id_usuario?: string;
}

export default async function getResidenceUser(id_usuario: string | undefined) {
  try {
    if(!id_usuario){
      return null
    }
    const response = await axios.get('http://localhost:3000/api/repime/residencia/get_per_user', {
      params: {
        id_usuario: id_usuario
      }
    });
    console.log(response.data.repime.result.residencias)
    if(response.data.repime.result.residencias.length == 0){
      return null;
    }
    return response.data.repime.result.residencias;
  } catch (err) {
    console.log(err);
    return null
  }
}