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
        value: 'trotes',
        label: 'Trotes',
        icon: GiCardJoker,
        description: 'Tradição de trotes na residência'
    },
    {
        value: 'diarista',
        label: 'Diarista',
        icon: AiOutlineClear,
        description: 'Possui diarista inclusa'
    },
    {
        value: 'garagem',
        label: 'Garagem',
        icon: AiFillCar,
        description: 'Esta residência possui garagem'
    },
    {
        value: 'kitnets',
        label: 'Kitnets',
        icon: BiHotel,
        description: 'Esta residência é uma kitnet'
    },
    {
        value: 'republica',
        label: 'República',
        icon: AiOutlineHome,
        description: 'Esta residência é uma república'
    },
    {
        value: 'menor-preco',
        label: 'Menor Preço',
        icon: GiReceiveMoney,
        description: 'Ordena pelo menor preço'
    },
    {
        value: 'maior-preco',
        label: 'Maior Preço',
        icon: GiTakeMyMoney,
        description: 'Ordena pelo maior preço'
    },
    {
        value: 'internet',
        label: 'Internet',
        icon: BsHddNetworkFill,
        description: 'Internet está inclusa na mensalidade'
    },
    {
        value: 'animais',
        label: 'Animais',
        icon: MdOutlinePets,
        description: 'Esta residência possui pets'
    },
    {
        value: 'rep-feminina',
        label: 'Rep.Feminina',
        icon: IoWomanSharp,
        description: 'Esta república exclusiva para mulheres'
    },
    {
        value: 'rep-masculina',
        label: 'Rep.Masculina',
        icon: IoManSharp,
        description: 'Esta residência exclusiva para homens'
    },
]

const legacyCategoryToSlug: Record<string, string> = {
    'Trotes': 'trotes',
    'Diarista': 'diarista',
    'Garagem': 'garagem',
    'Kitnets': 'kitnets',
    'República': 'republica',
    'Repúblicas': 'republica',
    'Menor Preço': 'menor-preco',
    'Maior Preço': 'maior-preco',
    'Internet': 'internet',
    'Animais': 'animais',
    'Rep.Feminina': 'rep-feminina',
    'Rep.Masculina': 'rep-masculina',
};

const normalizeCategoryParam = (category: string | null | undefined) => {
    if (!category) return undefined;

    return legacyCategoryToSlug[category] ?? category;
};

const Categories = () => {
    const params = useSearchParams();
    const category = normalizeCategoryParam(params?.get('category'));
    const pathname = usePathname();

    const isMainPage = pathname === '/';

    if (!isMainPage) {
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
                        value={item.value}
                        selected={category === item.value}
                        icon={item.icon}
                    />
                ))}
            </div>
        </Container>
    );
}

export default Categories;