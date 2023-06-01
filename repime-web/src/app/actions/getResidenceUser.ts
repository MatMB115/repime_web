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
    console.log(response.data.repime.result);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}