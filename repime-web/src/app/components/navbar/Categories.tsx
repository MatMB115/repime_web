import Container from "../Container";

import { GiCardJoker } from "react-icons/gi"
import { AiOutlineHome, AiOutlineClear, AiFillCar } from 'react-icons/ai'
import { usePathname, useSearchParams } from "next/navigation";
import { BsHddNetworkFill } from "react-icons/bs"
import { MdOutlinePets } from "react-icons/md"
import { IoWomanSharp, IoManSharp } from "react-icons/io5"
import { BiHotel } from "react-icons/bi"
import { GiTakeMyMoney, GiReceiveMoney } from "react-icons/gi";
import CategoryBox from "../CategoryBox";

export const categories = [
    {
        label: 'Trotes',
        icon: GiCardJoker,
        description: 'Tradição de trotes na residência'
    },
    {
        label: 'Diarista',
        icon: AiOutlineClear,
        description: 'Possui diarista inclusa'
    },
    {
        label: 'Garagem',
        icon: AiFillCar,
        description: 'Esta residência possui garagem'
    },
    {
        label: 'Kitnets',
        icon: BiHotel,
        description: 'Esta residência é uma kitnet'
    },
    {
        label: 'República',
        icon: AiOutlineHome,
        description: 'Esta residência é uma república'
    },
    {
        label: 'Menor Preço',
        icon: GiReceiveMoney,
        description: 'Ordena pelo menor preço'
    },
    {
        label: 'Maior Preço',
        icon: GiTakeMyMoney,
        description: 'Ordena pelo maior preço'
    },
    {
        label: 'Internet',
        icon: BsHddNetworkFill,
        description: 'Internet está inclusa na mensalidade'
    },
    {
        label: 'Animais',
        icon: MdOutlinePets,
        description: 'Esta residência possui pets'
    },
    {
        label: 'Rep.Feminina',
        icon: IoWomanSharp,
        description: 'Esta república exclusiva para mulheres'
    },
    {
        label: 'Rep.Masculina',
        icon: IoManSharp,
        description: 'Esta residência exclusiva para homens'
    },
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/';

    if(!isMainPage) {
        return null;
    }
    
    return ( 
        <Container>
            <div
                className="
                    pt-4
                    flex
                    flex-row
                    items-center
                    justify-between
                    overflow-x-auto
                   
                "
            >
                {categories.map((item) => (
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        selected={category === item.label}
                        icon={item.icon}
                    />
                ))}
            </div>
        </Container>
    );
}
 
export default Categories;