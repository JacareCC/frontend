import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation"
import Link from 'next/link';

interface OnlyOneOkButtonProps {
 
    text: string;
    setState?: any;
    textToCheck?: string |null;
    businessId: number
    data: any
  }
  
  const OnlyOneOkButtonBusiness: React.FC<OnlyOneOkButtonProps> = ({text, setState, textToCheck, businessId, data}) => {
    const [isButtonActive, setButtonActive] = useState<boolean>(false);
    const [clickCount, setClickCount] = useState<number>(0);

    const router = useRouter();

    useEffect(() =>{
      if(textToCheck === text)
        setButtonActive(true);
        else{
          setButtonActive(false);
        }
      
    },[textToCheck])

    useEffect(()=>{
    if(!isButtonActive){
        setState(false);
    }

    },[isButtonActive])

    function handleButtonClick() {
      setState(text);
    }
  
    const queryParams = {
      id: businessId,
      data: JSON.stringify(data),
    };
  
    return (
      <Link
        href={{
          pathname: '/user/business/restaurant',
          query: queryParams,
        }}
      >
        
          <button
            onClick={handleButtonClick}
            className={`w-18 ${`bg-jgreen`} text-white p-2 m-1 rounded`}
          >
            {text}
          </button>
        
      </Link>
    );
  };

  export default OnlyOneOkButtonBusiness;