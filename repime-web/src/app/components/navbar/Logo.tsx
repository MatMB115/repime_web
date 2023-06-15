'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Logo = () => {
    const router = useRouter();

    const [isScreenSmall, setIsScreenSmall] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsScreenSmall(window.innerWidth < 768); // Defina o tamanho de tela em que deseja substituir o logo
        };

        // Adiciona o event listener para controlar o redimensionamento da tela
        window.addEventListener('resize', handleResize);

        // Remove o event listener ao desmontar o componente
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <>
        {isScreenSmall ? (
            <Image
            onClick={() => router.push('/')}
            alt="Logo"
            className="md:block cursor-pointer"
            height={"50"}
            width={"50"}
            src={"/images/logomob.png"}
            />
        ) : (
            <Image
            onClick={() => router.push('/')}
            alt="Logo"
            className="hidden md:block cursor-pointer"
            height={"125"}
            width={"125"}
            src={"/images/logo.png"}
            />
        )}
        </>
        
    );
}

export default Logo;