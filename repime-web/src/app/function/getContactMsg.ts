export default function getContactMsg(
    tipo: string,
    contato: string, 
    rua: string, 
    numero: number,
    mensalidade: number
) {
    let msg = "https://wa.me/55" + contato.replaceAll(' ', '').replaceAll('(', '').replaceAll(')', '').replaceAll('-', '');
    msg = msg + `?text=Olá, tenho interesse na sua vaga de ${tipo} em ${rua} ${numero} pelo RepiME com mensalidade de R$${mensalidade}.`
    return msg     
}