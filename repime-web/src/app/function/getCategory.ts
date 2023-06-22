import { categories } from "../components/navbar/Categories";

export default function getCategory(tipo: boolean){
    if(tipo === true){
        return categories[3];
    }else{
        return categories[4];
    }
}