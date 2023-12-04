// Import necessary dependencies
import { useState } from "react";

// Define the ResetButton component
export default function ResetButton({ setResetCount }: { setResetCount: any }) {
  const [isClicked, setIsClicked] = useState(false);

  // Function to handle button click
  function handleButtonClick() {
    setResetCount((prev: number) => prev + 1);
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 500);
  }

  // Determine the button text and background color based on the click state
  const buttonText = isClicked ? 'Resetting...' : 'Reset';
  const buttonColor = isClicked ? 'bg-gray-300' : 'bg-emerald-500';

  // Return the styled button
  return (
    <button
      onClick={handleButtonClick}
      className={`text-white p-2 m-1 rounded transition duration-300 focus:outline-none ${buttonColor}`}
      style={{
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
      }}
    >
      {buttonText}
    </button>
  );
};
