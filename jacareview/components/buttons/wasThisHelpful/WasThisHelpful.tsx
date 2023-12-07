"use client"
import { useState, useEffect } from "react"
import VerifyButton from "./VerifyButton"

interface HelpfulProps {
    verified: boolean
    id: number
}

const WasThisHelpful: React.FC<HelpfulProps> = ({
    verified,
    id
}) =>{
    const[justVerified, SetJustVerified] = useState<boolean>(false);



    return (
<>
{!justVerified && !verified &&
(<VerifyButton id={id} setIsVerified={SetJustVerified}/>)}

<></>
</>
    )
}

export default WasThisHelpful