import { useState, useEffect } from 'react';

interface ColorChangingProps {
  setCuisineType: any;
  text: string;
  cuisineType: string[];
  includeOthers: boolean |null;
  count: number;
  setCount: any;
  setIncludeOthers: any;
  resetCount:number;
}


const ColorChangingButton: React.FC<ColorChangingProps> = ({
  text,
  setCuisineType,
  cuisineType,
  includeOthers,
  count,
  setCount,
  setIncludeOthers,
  resetCount,
}) => {
  const [isButtonActive, setButtonActive] = useState<boolean>(false);

  useEffect(() => {
    if (!isButtonActive && !includeOthers && count > 0) {
      handleInclusionChange();
    }
  }, [isButtonActive, count]);

  useEffect(()=>{
    setButtonActive(false);
  },[resetCount])

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
       let newArray= oldArray.filter((cuisine) => cuisine !== cuisineTypeToRemove);
       newArray.length === 0 ? newArray = ["restaurant"] : newArray = newArray;
       return newArray;
    });
  }

  function handleInclusionChange() {
    setCuisineType((oldArray: string[]) => {
      if (!Array.isArray(oldArray)) {
        oldArray = [];
      }
      // return oldArray.filter((cuisine) => cuisine === "vegan_restaurant" || cuisine === "vegetarian_restaurant");
      let newArray= oldArray.filter((cuisine) => cuisine === "vegan_restaurant" || cuisine === "vegetarian_restaurant");
       newArray.length === 0 ? newArray = ["restaurant"] : newArray = newArray;
       return newArray;
    });
  }

  return (
    <button
      onClick={handleButtonClick}
      className={`${
        isButtonActive ? 'bg-jgreen' : 'bg-gray-300'
      } text-white p-2 m-1 rounded`}
    >
      {text}
    </button>
  );
};

export default ColorChangingButton;