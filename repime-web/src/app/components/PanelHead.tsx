'use client'

import Image from 'next/image'
import Heading from "./Heading";

interface PanelHeadProps {
    title: string;
    imageSrc: string;
}

const PanelHead: React.FC<PanelHeadProps> = ({
    title,
    imageSrc,
}) => {
    return ( 
        <>
            <Heading
                title={title}
                subtitle={''}
            />
            <div
                className="
                    w-[20vh]
                    h-[20vh]
                    overflow-hidden
                    rounded-xl
                    relative
                "
            >
                <Image 
                    alt='User image'
                    src={imageSrc}
                    fill
                />
            </div>
        </>
    );
}
 
export default PanelHead;