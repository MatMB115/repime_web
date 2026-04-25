import prisma from "@/app/libs/prisma_db";

export interface ResidenceParam {
    id_usuario?: string;
}

export default async function getResidenceUser(id_usuario: string | undefined) {
  try {
    if(!id_usuario){
      return null
    }

    const residencias = await prisma.residencia.findMany({
      include: {
        tb_vaga: true,
      },
      where: {
        id_user: id_usuario,
      }
    });

    if(residencias.length == 0){
      return null;
    }

    return residencias;
    } catch (err) {
        console.log(err);
        return null
    }
}
