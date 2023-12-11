"use client"
import React, { useEffect } from "react"
import { ArrowBigLeft } from "lucide-react"

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
      className="mb-2 ml-2 w-1/4 md:w-1/2 md:w-2/12 bg-gray-400  p-2 rounded shadow-lg shadow-xl text-white flex gap-4"
    >
      <ArrowBigLeft/>
      Back
    </button>
    </>
)

}


export default ReviewBack