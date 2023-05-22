'use client'

import Select from 'react-select';

export type CitySelectValue = {
    value: string;
    label: string;   
}

interface CitySelectProps {
    value?: CitySelectValue;
    onChange: (value: CitySelectValue) => void;
}

const CitySelect: React.FC<CitySelectProps> = ({
    value,
    onChange
    
}) => {
    const cities = [
        {value: '1', label: 'Itajubá'},
        {value: '2', label: 'Piranguinho'},
        {value: '3', label: 'Pouso Alegre'},
    ];
    
    return ( 
        <div className="text-lg">
            <Select 
                placeholder="Escolha a cidade"
                isClearable
                options={cities}
                value={value}
                onChange={(value) => onChange(value as any)}
            />
        </div>
    );
}
 
export default CitySelect;