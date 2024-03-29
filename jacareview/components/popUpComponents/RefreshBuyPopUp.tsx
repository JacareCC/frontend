"use client"

import { useEffect, useState } from "react";

interface refreshPopUpProps {
    setRefreshPopUp: any;
    setStatusCodeForBuy: any
}

const RefreshPopUp: React.FC<refreshPopUpProps> = ({setRefreshPopUp, setStatusCodeForBuy}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  function handleBack() {
    setRefreshPopUp(false)
    setStatusCodeForBuy(0)
  }

  return (
    <div
      className={`${
        isMounted ? "fixed z-50 inset-0 bg-black bg-opacity-50" : "hidden"
      } flex items-center justify-center`}
    >
      <div className="bg-white p-8 rounded-lg shadow-md">
        <p className="mb-4">
            This Option is on Cooldown
        </p>
        <div className="flex items-center justify-center">
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded"
          onClick={handleBack}
        >
          Close
        </button>
        </div>
      </div>
    </div>
  );
};

export default RefreshPopUp;