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
    <div className='w-full'>
      <button
        className="w-1/2 md:w-1/4 m-4 bg-orange text-white p-2 rounded shadow-lg shadow-xl"
        onClick={openPopup}
      >
        Register your restaurant
      </button>

      {isPopupOpen && (
        <PopupFormClaim  onClose={() => setIsPopupOpen(false)} user_uid={user_uid} />
      )}
    </div>
  );
};

export default ClaimButton;
