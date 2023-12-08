import TierEditForm from '@/components/formComponents/TierEditForm';
import React, { useEffect, useState } from 'react';

interface EditOneOkButtonProps {
    backgroundColor: 'jgreen' | 'jyellow' | 'jgreend' | 'bronze' | 'silver' | 'gold';
    text: string;
    points: number;
    description: string;
    tierId: number
    refresh: number
  }
  
  const EditOneOkButtonTier: React.FC<EditOneOkButtonProps> = ({ refresh, backgroundColor, text, description, points, tierId}) => {
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
      <TierEditForm refresh={refresh} setShowForm={setShowForm} setButtonActive={setButtonActive} points={points} description={description} tierId={tierId}/>
    )}
    </div>
    </>
     );
};

  export default EditOneOkButtonTier;
