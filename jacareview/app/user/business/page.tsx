"use client"
import { useState, useEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initFirebase } from "@/firebase/firebaseapp";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import "../../../app/globals.css"
import OnlyOneOkButton from "@/components/buttons/onlyOneOkButton/OnlyOneOkButton";
import FetchBusinesses from "@/app/globalfunctions/FetchBusinesses";
import VerifyUser from "@/app/globalfunctions/TokenVerification";
import NewNav from "@/components/NewNav";

const BusinessPage: React.FC = () => {
  const [businessList, setBusinessList] = useState<any>(null);
  const [tierText, setTierText] = useState<null | string>(null);
  const [businessText, setBusinessText] = useState<null | string>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  initFirebase();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      VerifyUser(user.uid, setStatusCode);
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
    if(businessList){
      
    }
    console.log(businessList)
  },[businessList])


  return (
    <div>
    <div className="max-w-screen-md mx-auto">
    <NewNav />
    </div>
      <div className="mt-16 p-4">
      <h1 className="text-3xl font-bold mb-4">Business(es)</h1>
        <div>
          {businessList && businessList.length > 0 &&(
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