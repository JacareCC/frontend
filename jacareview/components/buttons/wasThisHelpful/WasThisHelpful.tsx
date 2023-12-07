"use client"
import { useState, useEffect } from "react"
import VerifyButton from "./VerifyButton"
import HideRestaurantButton from "./hideComponents/OriginalHideButton"

interface HelpfulProps {
    verified: boolean;
    id: number;
    setTheyVerified:any;
}

const WasThisHelpful: React.FC<HelpfulProps> = ({
    verified,
    id,
    setTheyVerified
}) =>{
    const[justVerified, SetJustVerified] = useState<boolean>(false);



    return (
<>
{!justVerified && !verified &&

(<div>
    <VerifyButton setTheyVerified={setTheyVerified} id={id} setIsVerified={SetJustVerified}/>
    </div>)}


<HideRestaurantButton id={id}/>
<></>
</>
    )
}

export default WasThisHelpful