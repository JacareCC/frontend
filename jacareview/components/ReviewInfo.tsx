"use client"
import React, { useState, useEffect } from "react";
import ReviewBack from "./buttons/ReviewInfoBackButton";
import WasThisHelpful from "./buttons/wasThisHelpful/WasThisHelpful";

interface ReviewInfoProps {
  data: Record<string, any>; 
  element: any;
  setIsClicked: any;
  setTheyVerified:any;
  setTheyWentBack:any;
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


const ReviewInfo: React.FC<ReviewInfoProps> = ({ data, element, setIsClicked, setTheyVerified, setTheyWentBack }) => {
  
  return (
    <>

    {data && ( <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-70 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md max-w-2xl w-full h-96 overflow-y-auto">
      <ReviewBack setTheyVerified={setTheyVerified} setTheyWentBack={setTheyWentBack} setIsClicked={setIsClicked} />
        
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
        <WasThisHelpful setTheyVerified={setTheyVerified} verified={element.isVerified} id={element.id}/>
      </div>
    </div>)}
    </>
  );
};

export default ReviewInfo;