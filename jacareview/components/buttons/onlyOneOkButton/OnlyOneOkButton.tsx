import React, { useState } from 'react';

interface OnlyOneOkButtonProps {
    backgroundColor: 'jgreen' | 'jyellow' | 'jgreend' | 'bronze' | 'silver' | 'gold';
    text: string;
    setState?: any;
    textToCheck?: string |null;
  }
  
  const OnlyOneOkButton: React.FC<OnlyOneOkButtonProps> = ({ backgroundColor, text, setState, textToCheck }) => {
    const [isButtonActive, setButtonActive] = useState<boolean>(false);

    const colorVariants:any = {
      gold: 'bg-gold',
      bronze: 'bg-bronze',
      silver: 'bg-silver',
      jgreen: 'jgreen'
    }

    function handleButtonClick() {
        setButtonActive((prev: boolean) => !prev);
        setState(text);
        if(textToCheck !== text){
          setButtonActive(false);
        }
      }

      console.log('Background Color:', `bg-${backgroundColor}`);

  return (
    <button
      onClick={handleButtonClick}
      className={`w-18 ${
        isButtonActive ? `${colorVariants[backgroundColor]}` : 'bg-gray-300'
      } text-white p-2 m-1 rounded`}
    >
      {text}
    </button>
  );
};

  export default OnlyOneOkButton;
