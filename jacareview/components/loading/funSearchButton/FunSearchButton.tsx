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
    <div data-testid="loading-animation2" className="relative">
       <button
        className={`mt-4 bg-gradient-to-r mb-4 from-yellow-500 via-red-500 to-pink-500 text-white px-6 py-3 rounded shadow-md hover:scale-105 transform transition-transform duration-300 ${
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


