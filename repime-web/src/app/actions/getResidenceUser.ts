import axios from "axios";

export interface ResidenceParam {
    id_usuario?: string;
}

export default async function getResidenceUser() {
    axios.defaults.baseURL = 'http://localhost:3000';
    axios.get('/api/repime/residencia/get_per_user',
    {params:{
        id_usuario: 'cli0bjhdq0000oa1ffi7d0y3o'
    }})
        .then((response)=>{
            console.log(response.data.repime.result)
            return response.data;
        })
        .catch((err)=>{
            console.log(err);
        })
}