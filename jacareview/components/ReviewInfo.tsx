"use client"
import React from "react";
import ReviewBack from "./buttons/ReviewInfoBackButton";

interface ReviewInfoProps {
  data: Record<string, any>; 
  element: any;
  setIsClicked: any;
}


const excludedKeys = ["date_made", "hidden", "id", "restaurant_place_id", "user_uid", "verified"];
const keysWithStars = ["atmosphere", "food_quality", "accessibility", "value_for_price", "customer_service"];

const starMapping: Record<number, string> = {
  1: "⭐",
  2: "⭐⭐",
  3: "⭐⭐⭐",
  4: "⭐⭐⭐⭐",
  5: "⭐⭐⭐⭐⭐",
};


const ReviewInfo: React.FC<ReviewInfoProps> = ({ data, element, setIsClicked }) => {
 
  return (
    <>

    {data && ( <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-70 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md max-w-2xl w-full">
      <ReviewBack setIsClicked={setIsClicked} />
        
        {element.isVerified ? <h2 className="text-3xl font-semibold mb-4">Review Information: You found this review helpful</h2> : <h2 className="text-3xl font-semibold mb-4">Review Information</h2>}
        <ul>
          {Object.entries(data).map(([key, value]) => {
            
            if (value && !excludedKeys.includes(key) && keysWithStars.includes(key)) {
       
              const displayValue = starMapping[value] || value;

              return (
                <li key={key} className="mb-2">
                  <strong>{key.replace(/_/g, ' ')}</strong>: {displayValue}
                </li>
              );
            }

           
            if (value && !excludedKeys.includes(key)) {
              return (
                <li key={key} className="mb-2">
                  <strong>{key.replace(/_/g, ' ')}</strong>: {value}
                </li>
              );
            }

            return null; 
          })}
        </ul>
      </div>
    </div>)}
    </>
  );
};

export default ReviewInfo;
