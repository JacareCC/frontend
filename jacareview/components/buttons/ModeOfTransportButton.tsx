"use client";

import React, { useState, useEffect } from "react";

interface ModeOfTransportProps {
    setModeOfTransport: React.Dispatch<React.SetStateAction<string>>;
    modeOfTransport: string;
    text: string
}

const ModeOfTransportButton: React.FC<ModeOfTransportProps> = ({ setModeOfTransport, modeOfTransport, text }) => {
    const [isButtonActive, setButtonActive] = useState<boolean>(false);

    useEffect(() =>{
        if(modeOfTransport === text){
            setButtonActive(true);
        }
        else{
            setButtonActive(false);
        }
    },[modeOfTransport])
    

    function handleButtonClick() {
        setButtonActive((prev:boolean) => !prev);
        setModeOfTransport(text);
    }

    return (
        <button
          onClick={handleButtonClick}
          className={`${
            isButtonActive ? "bg-jgreen" : "bg-gray-300"
          } text-white w-24 p-2 m-1 rounded`}
        >
          {text}
        </button>
      );
}

export default ModeOfTransportButton;
