"use client"
import { useState, useEffect } from "react";
interface ConfirmProps {
    setIsHidden:any;
    id: number
}

const ConfirmHide: React.FC<ConfirmProps> = ({id, setIsHidden}) => {
    const [patchedCorrectly, setPatchedCorrectly] = useState<boolean>(false);

    useEffect(() => {
        if(patchedCorrectly){
            window.location.reload();
        }

    }, [patchedCorrectly])



function handleBack(){
    setIsHidden(true);
}


async function sendToHide(){
    try {
        const results = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/business/review/hide/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            
          },
          body: JSON.stringify({id: id}),
        });

        if (results.ok) {
          setPatchedCorrectly(true);
        } else {
          console.error('Error saving changes:', results.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }


return (
    <div className="fixed inset-0 z-[101] flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white p-8 rounded-md">
        <div className="flex justify-center items-center">
        <p className="text-lg text-black font-semibold mb-4"><strong>Are you sure?</strong></p>
        </div>
        <div className="flex justify-end">
          <button onClick={sendToHide} className="mr-4 px-4 py-2 text-white bg-red-500 rounded-md">
            Hide
          </button>
          <button
            onClick={handleBack}
            className="px-4 py-2 text-gray-700 bg-gray-300 rounded-md"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmHide;