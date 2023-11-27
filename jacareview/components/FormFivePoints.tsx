import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface FormFivePointsProps {
  register: UseFormRegister<any>;
  name: string;
  title: string;
}

const FormFivePoints: React.FC<FormFivePointsProps> = ({ register, name, title }) => {
  return (
    <div className="border-b py-2 px-8 ">
      <div className="flex justify-between pr-4 ">
      <p className="ml-1 mb-1">{title}:</p>
        <select {...register(name)}>
          {[5,4,3,2,1].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FormFivePoints;