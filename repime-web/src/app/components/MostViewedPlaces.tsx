import React from 'react';
import { residencia_vagas_fotos_cidade } from "@prisma/client";
import Image from "next/image";

interface MostViewedPlacesProps {
  data: residencia_vagas_fotos_cidade[];
}

const MostViewedPlaces: React.FC<MostViewedPlacesProps> = ({
  data
}) => {
  return (
    <div className='w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-scroll'>
      <h1>Vagas mais acessadas</h1>
      <ul>
        {data.map((place, id_vaga) => (
          <li
            key={id_vaga}
            className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer'
          >
            <div className= 'rounded-lg p-3'>
            <Image 
              width={100}
              height={100}
              alt="Vaga"
              src={place.foto as string}
              className="
                  object-cover
                  h-50
                  w-50
                  group-hover:scale-110
                  transition
              "
            />
            </div>
            <div className='pl-4'>
              <p className='text-gray-800 font-bold'>R${place.mensalidade}</p>
              <p className='text-gray-400 text-sm'>{place.residencia_nome}</p>
            </div>
            <p className='lg:flex md:hidden absolute right-6 text-sm'>{place.qtd_visitas}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MostViewedPlaces;