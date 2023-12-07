// Import necessary dependencies
import { useState } from "react";

interface ResetButtonProps {
  setIsVerified:any
}

const VerifyButton: React.FC<ResetButtonProps> = ({
  setIsVerified
}) => {
  const [isClicked, setIsClicked] = useState(false);

  // Function to handle button click
  function handleButtonClick() {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
      setIsVerified(true);
    }, 500);
  }

  // Determine the button text and background color based on the click state
  const buttonText = isClicked ? 'Sending Positive Feedback...' : 'Yes it was helpful';
  const buttonColor = isClicked ? 'jgreen' : 'jyellow';

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

export default VerifyButton;
