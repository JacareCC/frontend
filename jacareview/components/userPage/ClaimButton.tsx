import { useState } from 'react';
import PopupFormClaim from '../formComponents/PopupFormClaim';

interface ClaimButtonProps {
    user_uid: string | null | undefined;
}


const ClaimButton: React.FC<ClaimButtonProps> = ({ user_uid }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  return (
    <div>
      <button
        className="rounded shadow-lg shadow-xl text-lg flex justify-center items-center w-full mx-auto rounded bg-green-500 text-white px-4 py-2 mb-8 mt-4"
        onClick={openPopup}
      >
        Claim a Restaurant
      </button>

      {isPopupOpen && (
        <PopupFormClaim  onClose={() => setIsPopupOpen(false)} user_uid={user_uid} />
      )}
    </div>
  );
};

export default ClaimButton;
