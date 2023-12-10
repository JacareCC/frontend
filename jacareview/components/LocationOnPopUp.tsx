import { useEffect, useState } from "react";

interface LocationPopupProps {
    setTurnOnLocation:any
}

const LocationPopup: React.FC<LocationPopupProps> = ({ setTurnOnLocation }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  function handleBack() {
    setTurnOnLocation((prev:boolean) => !prev)
  }

  return (
    <div
      className={`${
        isMounted ? "fixed z-50 inset-0 bg-black bg-opacity-50" : "hidden"
      } flex items-center justify-center`}
    >
      <div className="bg-white p-8 rounded-lg shadow-md">
        <p className="mb-4">
          In order to use the search function, allow your location in the browser
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

export default LocationPopup;