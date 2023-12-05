import React from 'react';

interface TierButtonProps {
  color: string;
  text: string;
  onClick?: () => void;
}

const TierButton: React.FC<TierButtonProps> = ({ color, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-${color}-500 hover:bg-${color}-700 text-white font-bold py-2 px-4 rounded`}
    >
      {text}
    </button>
  );
};

export default TierButton;
