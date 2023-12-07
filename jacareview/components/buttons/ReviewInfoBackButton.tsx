"use client"
import React from "react"
import { ArrowLeft } from "lucide-react"

interface ReviewBackProps {
    setIsClicked: any
}

const ReviewBack: React.FC<ReviewBackProps> = ({
    setIsClicked
}) => {


function handleGoBack(){
    setIsClicked((prev:boolean) => !prev);
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