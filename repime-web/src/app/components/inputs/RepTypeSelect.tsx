'use client'

import Select from 'react-select';

export type RepTypeSelectValue = {
    value: string;
    label: string;   
}

interface RepTypeSelectProps {
    value?: RepTypeSelectValue;
    onChange: (value: RepTypeSelectValue) => void;
}

const RepTypeSelect: React.FC<RepTypeSelectProps> = ({
    value,
    onChange
    
}) => {
    const repTypes = [
        {value: 'Masculina', label: 'República Masculina'},
        {value: 'Feminina', label: 'República Feminina'},
        {value: 'Mista', label: 'República Mista'},
    ];
    
    return ( 
        <div className="text-lg">
            <Select 
                placeholder="Escolha o tipo da república"
                isClearable
                options={repTypes}
                value={value}
                onChange={(value) => onChange(value as any)}
            />
        </div>
    );
}
 
export default RepTypeSelect;