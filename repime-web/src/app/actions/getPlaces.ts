import prisma from "@/app/libs/prisma_db"

export interface IPlacesParams {
    locationValue?: string;
    category?: string;
}

export default async function getPlaces(
    params: IPlacesParams
) {
    try {
        const { locationValue, category } = params;
        
        let query: any = {};
        let order: any = {};

        if(locationValue){
            query.id_cidade = {
                equals: +locationValue,
            };
        }

        if(category){
            if(category==='Trotes') query.tem_trote = true;
            if(category==='Diarista') query.tem_diarista = true;
            if(category==='Menor Preço') order.mensalidade = 'asc';
            if(category==='Maior Preço') order.mensalidade = 'desc';
            if(category==='Repúblicas') query.tipo = 'republica';
            if(category==='Kitnets') query.tipo = 'kitnet';
            if(category==='Garagem') query.tem_garagem = true;
            if(category==='Internet') query.internet_inclusa = true;
            if(category==='Animais') query.tem_animais = true;
            if(category==='Rep.Feminina') query.tipo_republica = 'feminina';
            if(category==='Rep.Masculina') query.tipo_republica = 'masculina';
        }else{
            order = {id_vaga: 'desc'}
        }

        

        const places = await prisma.residencia_vagas_fotos_cidade.findMany({
            where: query,
            orderBy: order,
        });

        return places;
    } catch (error: any) {
        throw new Error(error);
    }
}