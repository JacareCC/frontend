import React, { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import StarButton from './buttons/starbutton/StarButton';

interface FormFivePointsProps {
  register: UseFormRegister<any>;
  name: string;
  title: string;
}

const FormFivePoints: React.FC<FormFivePointsProps> = ({ register, name, title }) => {
  const [rating, setRating] = useState<number | null>(null);

  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  return (
    <div className="border-b py-2 px-8">
      <div className="flex justify-between pr-4">
        <p className="ml-1 mb-1">{title}:</p>
        <div className="flex">
          {[...Array(5)].map((_, index) => (
            <StarButton
              key={index}
              filled={index < (rating || 0)}
              onClick={() => handleStarClick(index)}
            />
          ))}
        </div>
      </div>
      <input type="hidden" {...register(name)} value={rating || ''} />
    </div>
  );
};

export default FormFivePoints;