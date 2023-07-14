'use client';

import React from 'react'
import { dashboard_stats } from "@prisma/client";
import { FiUsers } from 'react-icons/fi'
import { BsFillHousesFill } from 'react-icons/bs'
import { HiBadgeCheck } from 'react-icons/hi'
import { MdDeleteForever} from 'react-icons/md'
import { FaDoorOpen } from 'react-icons/fa'

interface TopCardsProps {
    data: dashboard_stats;
}


const TopCards: React.FC<TopCardsProps> = ({
    data
}) => {
    return (
        <div className='grid lg:grid-cols-4 gap-8 p-4'>
            <div className='lg:col-span-1 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
                <div className='flex flex-col w-full pb-4'>
                    <p className='text-2xl font-bold'>{String(data.total_vagas_acessadas)}</p>
                    <p className='text-gray-600'>Vagas acessadas</p>
                </div>
                <p className='bg-repimeblue flex justify-center items-center px-4 py-2 rounded-lg'>
                    <span className='text-white text-lg'><FaDoorOpen size={40} /></span>
                </p>
            </div>
            <div className='lg:col-span-1 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
                <div className='flex flex-col w-full pb-4'>
                    <p className='text-2xl font-bold'>{String(data.total_vagas_deletadas)}</p>
                    <p className='text-gray-600'>Vagas deletadas</p>
                </div>
                <p className='bg-repimeblue flex justify-center items-center px-4 py-2 rounded-lg'>
                    <span className='text-white text-lg'><MdDeleteForever size={40} /></span>
                </p>
            </div>
            <div className='lg:col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
                <div className='flex flex-col w-full pb-4'>
                    <p className='text-2xl font-bold'>{String(data.total_residencias)}</p>
                    <p className='text-gray-600'>Residências</p>
                </div>
                <p className='bg-repimeblue flex justify-center items-center py-2 px-4 rounded-lg'>
                    <span className='text-white text-lg'><BsFillHousesFill size={40}/></span>
                </p>
            </div>
            <div className='lg:col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
                <div className='flex flex-col w-full pb-4'>
                    <p className='text-2xl font-bold'>{String(data.total_usuarios)}</p>
                    <p className='text-gray-600'>Usuários</p>
                </div>
                <p className='bg-repimeblue flex justify-center items-center py-2 px-4 rounded-lg'>
                    <span className='text-white text-lg'><FiUsers size={40} /></span>
                </p>
            </div>
        </div>
    )
}

export default TopCards