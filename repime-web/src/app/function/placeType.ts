export default function placeType(tipo: string, upper: boolean){
    if(tipo === 'republica' && upper) return "República - ";
    if(tipo === 'republica' && !upper) return "república";
    if(upper) return "Kitnet - ";
    return "kitnet"
}