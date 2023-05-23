'use client'

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors
    placeholder?: string;
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type,
    disabled,
    formatPrice,
    required,
    register,
    placeholder,
    errors
    
}) => {
    return ( 
    <div className="w-full relative">
        {formatPrice && (
            <BiDollar 
                size={24}
                className="
                    text-neutral-700
                    absolute
                    top-5
                    left-2"
            />
        )}
        <input 
            id={id}
            disabled={disabled}
            {...register(id, { required })}
            placeholder={placeholder}
            type={type}
            className="w-6 h-6"
            />
            <label 
                className="px-4 text-zinc-500"
            >
                {label}
            </label>
    </div> );
}
 
export default Input;