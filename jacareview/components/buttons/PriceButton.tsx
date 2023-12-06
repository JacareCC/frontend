"use client"
import { CircleDollarSign } from "lucide-react";
import { useState, useEffect } from "react";

interface PriceButtonProps {
    setPrice: any;
    text: string;
    price: number
  }
  
  
  const PriceButton: React.FC<PriceButtonProps> = ({
    text,
    setPrice,
    price
  }) => {
    const [isButtonActive, setButtonActive] = useState<boolean>(false);
    const number = price;
    useEffect(() =>{
        if(price === text.length){
            setButtonActive(true);
        }
        else{
            setButtonActive(false);
        }
    },[price])
    

    function handleButtonClick() {
        setButtonActive((prev:boolean) => !prev);
        setPrice(text.length);
    }

return (
    <button
      onClick={handleButtonClick}
      className={`w-14 ${
        isButtonActive ? 'bg-jgreen' : 'bg-gray-300'
      } text-white p-2 m-1 rounded`}
    >
      {text}
    </button>
  );
};

export default PriceButton;