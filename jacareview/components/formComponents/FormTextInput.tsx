import { UseFormRegister, FieldValues, UseFormSetValue } from 'react-hook-form';
import React, { useEffect, useState } from "react";

interface FormTextInputProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  name: string;
  title: string;
  placeholder: string | undefined
}

const InputText: React.FC<FormTextInputProps> = ({ register, name, title, placeholder, setValue }) => {

  const [rating, setRating] = useState<string | null>(null);

  const handleUnfocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    const newRating = event.target.value;
    setRating(newRating);

    // Register the new value immediately
    register(name, { value: newRating });
    
    // If setValue is available, update the value in the form state
    if (setValue) {
      setValue(name, newRating);
    }
  };


    return (
        <div className="flex flex-col px-4">
            <p className="ml-1 mt-1">{title}:</p>
            <label></label>
            <div className="flex align-center border-solid border border-gray-300 bg-white rounded-md">
              <textarea onBlur={handleUnfocus} className='w-full m-1 px-2' placeholder={placeholder} />
            </div>
        </div>
    );
};

export default InputText;
