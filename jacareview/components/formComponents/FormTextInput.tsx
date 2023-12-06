import { UseFormRegister, FieldValues } from 'react-hook-form';
import React, { useEffect, useState } from "react";

interface FormTextInputProps {
  register: UseFormRegister<any>;
  name: string;
  title: string;
  placeholder: string | undefined
}

const InputText: React.FC<FormTextInputProps> = ({ register, name, title, placeholder }) => {
    return (
        <div className="flex flex-col px-4">
            <p className="ml-1 mt-1">{title}:</p>
            <label></label>
            <div className="flex align-center border-solid border border-gray-300 bg-white rounded-md">
              <textarea className='w-full m-1 px-2' placeholder={placeholder} {...register(name as never)} />
            </div>
        </div>
    );
};

export default InputText;
