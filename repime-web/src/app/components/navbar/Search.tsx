'use client';

import { BiSearch } from 'react-icons/bi';

const Search = () => {
    return ( 
        <div
            className="
            border-[1px]
            w-full
            md:w-auto
            py-2
            rounded-full
            shadow-sm
            hover:shadow-md
            transition
            cursor-pointer
            "
        >
            <div
                className="
                flex
                flex-row
                items-center
                justify-between
                "
            >
                <div
                    className="
                    text-sm
                    font-bold
                    px-4
                    "
                >
                    Busque por vagas
                </div>
                <div
                    className="
                    p-2
                    mx-2
                    bg-repimeblue
                    rounded-full
                    text-white
                    "
                >
                    <BiSearch size={16} />
                </div>
            </div>
        </div>
     );
}
 
export default Search;