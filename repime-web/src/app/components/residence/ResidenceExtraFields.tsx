'use client';

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

import Input from "../inputs/Input";

interface ResidenceExtraFieldsProps {
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const ResidenceExtraFields: React.FC<ResidenceExtraFieldsProps> = ({
  disabled,
  register,
  errors,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input
          id="residencia.tempo_unifei"
          type="number"
          label="Minutos até a UNIFEI"
          disabled={disabled}
          register={register}
          errors={errors}
        />
        <Input
          id="residencia.tempo_centro"
          type="number"
          label="Minutos até o centro"
          disabled={disabled}
          register={register}
          errors={errors}
        />
      </div>
      <Input
        id="residencia.internet_mbps"
        type="number"
        label="Internet (Mbps)"
        disabled={disabled}
        register={register}
        errors={errors}
      />
      <Input
        id="residencia.instagram"
        type="text"
        label="Instagram da residência"
        disabled={disabled}
        register={register}
        errors={errors}
        placeholder="@republica ou https://instagram.com/republica"
      />
    </div>
  );
};

export default ResidenceExtraFields;
