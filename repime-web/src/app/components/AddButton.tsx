'use client';

import useResidenceModal from "../hooks/useResidenceModal";

interface AddButtonProps {
    label: string;
}

const AddButton: React.FC<AddButtonProps> = ({
    label
}) => {
    const residenceModal = useResidenceModal();
    return ( 
    <div 
        onClick={residenceModal.onOpen}
        className="
        absolute
        py-2 
        px-4 
        bottom-15 
        right-10
        bg-repimehardblue
        rounded-full
        text-white
        items-center
        text-4xl
        hover:shadow-md
        transition
        cursor-pointer
        hover:bg-repimeblue
    ">
        {label}
    </div> 
    );
}
 
export default AddButton;