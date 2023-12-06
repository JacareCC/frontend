"use client"
import { useState, useEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initFirebase } from "@/firebase/firebaseapp";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import "../../../app/globals.css"
import FetchBusinesses from "@/app/globalfunctions/FetchBusinesses";
import VerifyUser from "@/app/globalfunctions/TokenVerification";
import BusinessNavBar from "@/components/BusinessNavBar";
import "../../../app/globals.css"
import NewNav from "@/components/NewNav";


const BusinessPage: React.FC = () => {
  const [businessList, setBusinessList] = useState<any>(null);
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
  },[businessList])

  //
  function handleTab(event:any){
    const text = event.target.innerText;
    setButtonActiveBusiness(text);
  }


  return (
    <><div className="max-w-screen-md mx-auto">
      <NewNav />
    </div><div className="flex flex-col h-screen">
        <div className="flex-grow flex flex-col-reverse md:flex-row items-center justify-center overflow-hidden">
          <div className="md:w-1/2 mt-16 flex items-center justify-center">
            <img src="../../../business-gator.jpg" alt="Business Gator" />
          </div>
          <div className="w-full md:w-1/2 bg-white">
            <BusinessNavBar />
          </div>
        </div>
      </div></>
  );
};

export default BusinessPage;