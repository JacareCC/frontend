"use client"
import { useState, useEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initFirebase } from "@/firebase/firebaseapp";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import OnlyOneOkButtonBusiness from "@/components/buttons/onlyOneOkButton/OnlyOneOkButtonBusiness";
import OnlyOneOkButtonTier from "@/components/buttons/onlyOneOkButton/OnlyOneOkButtonTier";
import FetchBusinesses from "@/app/globalfunctions/FetchBusinesses";
import VerifyUser from "@/app/globalfunctions/TokenVerification";
import "../app/globals.css"



const BusinessNavBar: React.FC = () => {
  const [businessList, setBusinessList] = useState<any>(null);
  const [tierText, setTierText] = useState<null | string>(null);
  const [businessText, setBusinessText] = useState<null | string>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [isButtonActiveBusiness, setButtonActiveBusiness] = useState<any>(null);
  const [uid, setUid] = useState<string>("")

  initFirebase();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      VerifyUser(user.uid, setStatusCode);
      setUid(user.uid)
    } else {
      router.push("/");
    }
  });

  useEffect(()=>{
    if(statusCode && statusCode !== 200){
      router.push("/")
    }
  },[statusCode])

  useEffect(() => {
    if(user){
      FetchBusinesses(user.uid, setBusinessList)
    }
  },[user])

  useEffect(() => {
    console.log(businessList)
  },[businessList])

  //
  function handleTab(event:any){
    const text = event.target.innerText;
    setButtonActiveBusiness(text);
    
  }


  return (
    <div>
      <Navbar />

      <div className="mt-16 p-4">
        
          {businessList && businessList.length > 0 &&(
            <div>
              <div className="flex items-center justify-center font-yaro text-jgreen">
            <h1 className="text-3xl font-bold mb-4">Business(es)</h1>
            </div>
            <div className="flex flex-row justify-center">
              {businessList.map((element: any, index: number) => (
                <div key={`5${index}`}>
                <div onClick={handleTab} a-key={element.business_name} className="flex-shrink-0 mx-2" key={index}>
                  <OnlyOneOkButtonBusiness
                    businessId={element.id}
                    text={element.business_name}
                    textToCheck={isButtonActiveBusiness}
                    setState={setBusinessText}
                    data={element}
                  />
                  </div>
                  
                </div>
               ))}
            </div>
             </div>
          )
          }
       

        
       
      </div>
    </div>
  );
};

export default BusinessNavBar;