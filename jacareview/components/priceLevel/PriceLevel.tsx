"use client"
import priceLevelText from "@/app/globalfunctions/PriceLevelText"
import { useState, useEffect } from "react"
import priceMultiplier from "@/app/globalfunctions/PriceMultiplier"

interface PriceLevelProps{
    priceLevel: string
}

const PriceLevelComponent: React.FC<PriceLevelProps> = ({
   priceLevel
  }) => {
    const [text, setText]=useState<any>("");
    

    useEffect(()=>{
        if(priceLevel){
            let multiplier = priceMultiplier(priceLevel)
            if(typeof multiplier === "number"){
            let newText = priceLevelText(multiplier)
            console.log(multiplier)
            setText(newText)
            }
        }
    },[priceLevel])
   

    
   

    return(
        <>
        {text}
        </>
    )
}

export default PriceLevelComponent;