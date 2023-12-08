import React, { useState } from 'react';

interface FunSearchButtonProps {
    fetchData: () => Promise<void>,
    text: string
  }

const FunSearchButton: React.FC<FunSearchButtonProps> = ({fetchData, text}) => {
  const [isClicked, setClicked] = useState(false);

  const handleClick = () => {
    fetchData();
  };

  return (
    <div className="relative">
       <button
        className={`mt-4 bg-jgreen hover:bg-emerald-600 text-white  py-2 px-4 rounded transition duration-300 ease-in-out ${
          isClicked ? 'playing fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50' : ''
        }`}
        onClick={handleClick}
      >
        {isClicked ? (
          <img
            src="https://media.giphy.com/media/VQUo8CBVIRliuz1TNI/giphy.gif"
            alt="Alligator eating a star"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          text
        )}
      </button>
    </div>
  );
};

export default FunSearchButton;


