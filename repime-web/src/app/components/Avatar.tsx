'use client';

import Image from "next/image";

interface AvatarProps {
    src?: string | null | undefined
}

const Avatar: React.FC<AvatarProps> = ({
    src
}) => {    
    return ( 
        <Image
            className="force rounded-full"
            height="30"
            width="30"
            style={{width: 30, height: 30}}
            alt="Avatar"
            src={src || "/images/placeholder.jpg"}
        />
    );
}
 
export default Avatar;