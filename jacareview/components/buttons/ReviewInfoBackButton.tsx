"use client"
import React, { useEffect } from "react"
import { ArrowLeft } from "lucide-react"

interface ReviewBackProps {
    setIsClicked: any;
    setTheyVerified:any;
    setTheyWentBack:any
}

const ReviewBack: React.FC<ReviewBackProps> = ({
    setIsClicked,
    setTheyWentBack
}) => {

    useEffect(() =>{
        setTheyWentBack(false);

    },[])

function handleGoBack(){
    setIsClicked((prev:boolean) => !prev);
    setTheyWentBack(true);
}


return (
    <>
     <button
      onClick={handleGoBack}
      className="bg-gray-800 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-700 focus:outline-none"
    >
      <ArrowLeft size={20} />
      Back
    </button>
    </>
)

}


export default ReviewBack