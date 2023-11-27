import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface BinaryChoiceProps {
  register: UseFormRegister<any>;
  name: string;
  title: string;
}

const BinaryChoice: React.FC<BinaryChoiceProps> = ({ register, name, title }) => {
  return (
    <div className="border-b px-8 py-2">
      <div className="flex justify-between aling-center pr-4">
        <p className="ml-1">{title}:</p>
        <div className="flex space-x-4">
          <div>
            <input
              type="radio"
              id={`${name}-yes`}
              {...register(name, { value: true })}
              value="true"
            />
            <label htmlFor={`${name}-yes`}> Yes</label>
          </div>
          <div>
            <input
              type="radio"
              id={`${name}-no`}
              {...register(name, { value: false })}
              value="false"
            />
            <label htmlFor={`${name}-no`}> No</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinaryChoice;
