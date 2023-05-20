import Container from "../Container";

import { GiCardJoker, GiPathDistance } from 'react-icons/gi'
import { AiFillDollarCircle, AiOutlineHome } from 'react-icons/ai'
import { BiHotel } from 'react-icons/bi'

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
        description: 'Mostra apenas as vagas de república'
    },
    {
        label: 'Kitnets',
        icon: BiHotel,
        description: 'Mostra apenas as vagas de kitnet'
    },
]

const Categories = () => {
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

            </div>
        </Container>
    );
}
 
export default Categories;