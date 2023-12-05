"use client"
import { useState, useEffect } from "react"
import Navbar from "@/components/Navbar";
import "../../../app/globals.css"
import OnlyOneOkButton from "@/components/buttons/onlyOneOkButton/OnlyOneOkButton";

const BusinessPage: React.FC = () => {
  const [businessList, setBusiness] = useState<any[]>([])
  const [tierText, setTierText] = useState<null | string>(null)
  const [businessText, setBusinessText] = useState<null | string>(null)

  return (
    <div>
      <Navbar />

      <div className="mt-16 p-4">
      <h1 className="text-3xl font-bold mb-4">Business(es)</h1>
        <div>
          {businessList.length > 0 &&(
            <>
            {businessList.map((element:any, index:number) => {
              <div key={index}>
            <OnlyOneOkButton backgroundColor={"jgreen"} text={element.name} textToCheck={businessText} setState={setBusinessText}/>
            </div>
            }
            )
            }
            </>
          )}
        </div>

        
        <div>
          <OnlyOneOkButton backgroundColor={"bronze"} text="Bronze" textToCheck={tierText} setState={setTierText}/>
          <OnlyOneOkButton backgroundColor={"silver"} text="Silver" textToCheck={tierText} setState={setTierText}/>
          <OnlyOneOkButton backgroundColor={"gold"} text="Gold" textToCheck={tierText} setState={setTierText}/>
        </div>
      </div>
    </div>
  );
};

export default BusinessPage;