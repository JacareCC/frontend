import { useState, useEffect } from 'react';

interface ColorChangingProps {
  setCuisineType: any;
  text: string;
  cuisineType: string[];
  includeOthers: boolean |null;
  count: number;
  setCount: any
  setIncludeOthers: any
}


const ColorChangingButton: React.FC<ColorChangingProps> = ({
  text,
  setCuisineType,
  cuisineType,
  includeOthers,
  count,
  setCount,
  setIncludeOthers
}) => {
  const [isButtonActive, setButtonActive] = useState<boolean>(false);

  useEffect(() => {
    if (!isButtonActive && !includeOthers && count > 0) {
      handleInclusionChange();
    }
  }, [isButtonActive, count]);

  const getCuisineTypeToAdd = () => {
    if (text.toLowerCase() === 'vegan') {
      return 'vegan_restaurant';
    } else if (text.toLowerCase() === 'vegetarian') {
      return 'vegetarian_restaurant';
    } else if (text.toLowerCase() === 'include other cuisines') {
      return ''; // Return an empty string for 'include other cuisines'
    } else {
      return ''; // Return an empty string for non-vegan and non-vegetarian text
    }
  };

  function handleButtonClick() {
    setButtonActive((prev:boolean) => !prev);
    setCount((prev:number) => prev += 1);

    const cuisineTypeToAdd = getCuisineTypeToAdd();

    if (text.toLowerCase() === 'include other cuisines') {
      setIncludeOthers((prev: boolean | null) => (prev === null ? true : !prev));
    } else if (cuisineTypeToAdd !== null) {
      if (!isButtonActive) {
        handleCuisineAdd();
      } else {
        handleCuisineRemoval(cuisineTypeToAdd);
      }
    }
  }

  function handleCuisineAdd() {
  setCuisineType((oldArray: string[]) => {
    if (!Array.isArray(oldArray)) {
      oldArray = [];
    }

    const cuisineTypeToAdd = getCuisineTypeToAdd();

    if (!includeOthers || !oldArray.includes(cuisineTypeToAdd)) {
      return [...oldArray, cuisineTypeToAdd].filter(Boolean);
    } else {
      return oldArray.filter((cuisine) => cuisine !== cuisineTypeToAdd);
    }
  });
}

  function handleCuisineRemoval(cuisineTypeToRemove: string) {
    setCuisineType((oldArray: string[]) => {
      if (!Array.isArray(oldArray)) {
        oldArray = [];
      }
      return oldArray.filter((cuisine) => cuisine !== cuisineTypeToRemove);
    });
  }

  function handleInclusionChange() {
    setCuisineType((oldArray: string[]) => {
      if (!Array.isArray(oldArray)) {
        oldArray = [];
      }
      // Keep only 'vegan_restaurant' and 'vegetarian_restaurant' in the array
      return oldArray.filter((cuisine) => cuisine === "vegan_restaurant" || cuisine === "vegetarian_restaurant");
    });
  }

  return (
    <button
      onClick={handleButtonClick}
      className={`${
        isButtonActive ? 'bg-green-500' : 'bg-gray-300'
      } text-white p-2 m-1 rounded`}
    >
      {text}
    </button>
  );
};

export default ColorChangingButton;