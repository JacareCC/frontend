import React, { useState, useEffect } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import StarButton from "../buttons/starbutton/StarButton";

interface FormFivePointsProps {
  register: UseFormRegister<any>;
  name: string;
  title: string;
  setValue: UseFormSetValue<any>;
  onStarFilled: (index: number) => void;
}

const FormFivePoints: React.FC<FormFivePointsProps> = ({
  register,
  name,
  title,
  setValue,
  onStarFilled,
}) => {
  const [rating, setRating] = useState<number | null>(null);

  const handleStarClick = (index: number) => {
    const newRating = index + 1;
    setRating(newRating);

    register(name, { value: newRating });
    setValue(name, newRating);

    onStarFilled(index);
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
    </div>
  );
};

export default FormFivePoints;
