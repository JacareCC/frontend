import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import thanksGif from "../../public/thanks.gif";

const ThankYou = () => {
    const [back, setBack] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
                  setBack(true);
                }, 2000); 
    }, []);

    useEffect(() => {
        if(back){
            router.push("user")
        }
    }, [back])
  
    return (
      <div className="z-10 fixed top-0 right-0 bottom-0 left-0 bg-white flex justify-center items-center">
        <div className="bg-emerald-500 p-2 rounded-full w-80">
          <img
            src={thanksGif.src}
            alt="Loading"
            className="w-full h-full rounded-full border-2 border-white"
          />
        </div>
      </div>
    );
};

export default ThankYou;
