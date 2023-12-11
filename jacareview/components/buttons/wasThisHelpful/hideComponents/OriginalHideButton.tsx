"use client";

import { FC, useState } from "react";
import ConfirmHide from "./ComfirmHide";

interface HideProps {
  id: number;
}

const HideRestaurantButton: React.FC<HideProps> = ({ id }) => {
  const [isHidden, setIsHidden] = useState(true);

  function bringUpConfirm() {
    setIsHidden(false);
  }

  return (
    <div className="flex flex-col items-center mt-8">
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-md mb-4"
        onClick={bringUpConfirm}
      >
        Click To Hide Review
      </button>
      {!isHidden && (
        <div className="bg-red-500 text-white px-6 py-3 rounded-md">
          <ConfirmHide id={id} setIsHidden={setIsHidden} />
        </div>
      )}
    </div>
  );
};

export default HideRestaurantButton;
