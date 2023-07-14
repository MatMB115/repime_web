import Container from "../Container";

import { GiCardJoker, GiPathDistance } from 'react-icons/gi'
import { AiFillDollarCircle, AiOutlineHome } from 'react-icons/ai'
import { usePathname, useSearchParams } from "next/navigation";
import { BiHotel } from 'react-icons/bi'
import CategoryBox from "../CategoryBox";

export const categories = [
    {
        label: 'Trotes',
        icon: GiCardJoker,
        description: 'Tradição de trotes na residência'
    },
    {
        label: 'Proximidade',
        icon: GiPathDistance,
        description: 'Distância da residência até universidade'
    },
    {
        label: 'Preço',
        icon: AiFillDollarCircle,
        description: 'Ordena pelo menor preço'
    },
    {
        label: 'República',
        icon: AiOutlineHome,
        description: 'Esta residência é uma república'
    },
    {
        label: 'Kitnets',
        icon: BiHotel,
        description: 'Esta residência é uma kitnet'
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