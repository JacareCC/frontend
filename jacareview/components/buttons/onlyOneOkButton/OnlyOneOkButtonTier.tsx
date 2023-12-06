import TierForm from '@/components/formComponents/TierForm';
import React, { useEffect, useState } from 'react';

interface OnlyOneOkButtonProps {
    backgroundColor: 'jgreen' | 'jyellow' | 'jgreend' | 'bronze' | 'silver' | 'gold';
    text: string;
    setStatusCode?: any;
    textToCheck?: string |null;
    id: string;
    restaurant_id: number
  }
  
  const OnlyOneOkButtonTier: React.FC<OnlyOneOkButtonProps> = ({ backgroundColor, text, setStatusCode, id, restaurant_id}) => {
    const [isButtonActive, setButtonActive] = useState<boolean>(false);
    const [showForm, setShowForm] = useState<boolean>(false);

    const colorVariants:any = {
      gold: 'bg-gold',
      bronze: 'bg-bronze',
      silver: 'bg-silver',
      jgreen: 'var(--jgreen)'
    }

    function handleButtonClick() {
      setButtonActive((prev:boolean) => !prev)
      setShowForm(true);
      
    }

  return (
    <>
    <button
      onClick={handleButtonClick}
      className={`w-24 ${
        `${colorVariants[backgroundColor]}`
      } text-white p-2 m-1 rounded`}
    >
      {text}
      
    </button>
    <div>
    {isButtonActive &&(
      <TierForm restaurant_id={restaurant_id} id={id} text={text} setButtonActive={setButtonActive} showForm={showForm} setStatusCode={setStatusCode} setShowForm={setShowForm}/>
    )}
    </div>
    </>
     );
};

  export default OnlyOneOkButtonTier;
