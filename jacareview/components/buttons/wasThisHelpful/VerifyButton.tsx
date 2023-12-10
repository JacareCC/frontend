// Import necessary dependencies
import { useState } from "react";

interface VerifyButtonProps {
  setIsVerified: any;
  id: number;
  setTheyVerified: any;
}

const VerifyButton: React.FC<VerifyButtonProps> = ({
  setIsVerified,
  id,
  setTheyVerified,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  function handleButtonClick() {
    sendToVerify();
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
      setIsVerified(true);
    }, 500);
  }

  async function sendToVerify() {
    try {
      const results = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}business/review/verify/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        }
      );

      if (results.ok) {
        setTheyVerified(true);
      } else {
        console.error("Error saving changes:", results.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const buttonText = isClicked
    ? "Sending Positive Feedback..."
    : "Yes it was helpful";
  const buttonColor = isClicked ? "bg-jgreen" : "bg-jyellow";

  return (
    <button
      onClick={handleButtonClick}
      className={`text-white p-2 m-1 rounded transition duration-300 focus:outline-none ${buttonColor}`}
      style={{
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      {buttonText}
    </button>
  );
};

export default VerifyButton;
