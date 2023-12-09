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
import NewNav from "./NewNav";



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
    <><div className="flex items-center justify-center">
      <h1 className="text-xl font-bold m-4">My Business(es)</h1>
    </div><div className="max-h-[400px] overflow-y-scroll">
        <div className="bg-white">
          {businessList && businessList.length > 0 && (
            <div>
              <div className="flex flex-col justify-center p-2 ">
                {businessList.map((element: any, index: number) => (
                  <>
                  <div className="">
                  <h1 className="text-lg text-center border-b bg-test font-semibold rounded-t">{element.business_name}</h1>
                  <div
                    key={`5${index}`}
                    className="card w-full scrollbar-thin  bg-test mb-4 rounded-b shadow-xl p-2 pb-4"
                    >
                    <div onClick={handleTab} a-key={element.business_name} className="p-2" key={index}>
                      <div className="pb-1">
                        {element.reviews ? (
                          <div>
                            <h1>You have {element.reviews.length} reviews</h1>
                          </div>
                        ) :
                        <div>
                            <h1>No reviews</h1>
                          </div>}
                            </div>
                      </div>
                      <OnlyOneOkButtonBusiness
                        businessId={element.id}
                        text={'Show info.'}
                        textToCheck={isButtonActiveBusiness}
                        setState={setBusinessText}
                        data={element} />
                    </div>
                  </div></>
                ))}
              </div>
            </div>
          )}
        </div>
      </div></>
  );
};

export default BusinessNavBar;