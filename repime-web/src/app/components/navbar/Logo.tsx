'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();

    return (
        <>
            <div className="flex flex-row items-center">
            <Image
            onClick={() => router.push('/')}
            alt="Logo"
            className="md:block cursor-pointer"
            height={"45"}
            width={"45"}
            src={"/images/logo.png"}
            />
                <div 
                    onClick={() => router.push('/')} 
                    className="
                        text-xl 
                        text-bold 
                        hidden md:block 
                        cursor-pointer
                    "
                >
                    <span>Repi</span>
                    <span className="text-repimeblue">ME</span>
                </div>
            </div>
        </>
    );
}

export default Logo;