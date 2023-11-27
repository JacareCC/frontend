import { UseFormRegister, FieldValues } from 'react-hook-form';
import React, { useEffect, useState } from "react";

interface FormTextInputProps {
  register: UseFormRegister<any>;
  name: string;
  title: string;
}

const InputText: React.FC<FormTextInputProps> = ({ register, name, title }) => {
    return (
        <div className="flex flex-col w-[100vw] px-8 py-2">
            <p className="ml-1 mt-1">{title}:</p>
            <label></label>
            <div className="flex align-center border-solid border border-gray-300 rounded-md">
              <textarea className='w-[80vw] m-1 px-2' placeholder='Leave your opinion about it... ' {...register(name as never)} />
            </div>
        </div>
    );
};

export default InputText;
