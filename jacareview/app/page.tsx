"use client"

import { initFirebase } from "@/firebase/firebaseapp"
import { getAuth, signInWithPopup, GoogleAuthProvider, getIdToken} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth"
import { useEffect, useState } from "react";
import CookieConsent from "@/components/Cookies";
import TermsAndConditions from "@/components/TermsAndConditions";
import './page.css'
import './globals.css'

export default function Home() {
  const [uid, setUid] = useState<string | null>(null);
  const [statusCode, setStatusCode] = useState<number | null> (null)
  const [termsAgreed, setTermsAgreed] = useState<boolean>(false)
  const [toggleAgreement, setToggleAgreement] = useState<boolean>(false)
  const [registrationReady, setRegistrationReady] = useState<boolean>(false)
  const [loginTry, setLoginTry] = useState<boolean>(false)
  const [cookiesAccepted, setCookiesAccepted] = useState<boolean>(false);
  const [showConsent, setShowConsent] = useState<boolean>(true);


  initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth)
  const router = useRouter();
  
  useEffect(()=>{
    if(user){
    router.push("/searchpage")
    }
  }, [user])

  useEffect(() => {
    if(statusCode === 200 || statusCode === 201){
      router.push("/searchpage");
    }
    if(statusCode === 401){
      setLoginTry((prev:boolean) => !prev);
    }
    if(statusCode === 400){
      setRegistrationReady((prev:boolean) => !prev);
    }
  },[statusCode])


  useEffect(() =>{
    if(loginTry){
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}login/`, {
      method: 'GET',
      headers: {
        'Authorization': `${uid}`, 
      }
    })
        .then(response =>  response.status)
        .then(status => setStatusCode(status));
  }
  
  }, [loginTry])

  useEffect(() =>{
    if(registrationReady){
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}register/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json" , 
      },
      body : JSON.stringify({uid: uid})
    })
        .then(response => response.status )
        .then(status => setStatusCode(status));   
  }
  }, [registrationReady])

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    setCookiesAccepted(!!cookiesAccepted);
    setShowConsent(!cookiesAccepted);
  }, []);

  const handlerCookiesAccept = () => {
    console.log(cookiesAccepted)
    setCookiesAccepted(true);
    setShowConsent(false);
  }

  async function signIn () {
    const result = await signInWithPopup(auth, provider);
    setUid(result.user.uid);
    setLoginTry((prev:boolean) => !prev);
  }

  //handler
  function handleToggleToTerms(){
    setToggleAgreement((prev:boolean) => !prev)
  }

  async function handleRegister(){
    const result = await signInWithPopup(auth, provider);
    setUid(result.user.uid)
    setRegistrationReady((prev:boolean)=> !prev)
  }

  return (
    <>
    {cookiesAccepted ? null : (<div className="absolute inset-0 bg-black bg-opacity-0 z-3"></div>)}
    {!user?(
    <main className="bg-[url('../public/logo-home.png')] bg-no-repeat bg-top bg-contain h-screen">
      {loading ? <div>Loading...</div>:
      <div className="flex flex-col items-center">
          <button className="button-4" onClick={signIn}>Sign In!</button>
          { termsAgreed ? <button onClick={handleRegister}>Register</button> :
          <button className="button-4" >Register</button>}
          <h2 onClick={handleToggleToTerms}>Click here to read and agree to Terms and Conditions before Registration</h2>
        {toggleAgreement && (<TermsAndConditions setTermsAgreed={setTermsAgreed} setToggleAgreement={setToggleAgreement}/>)}
      </div>
      }
          {showConsent && (
            <div className="cookie-consent-container absolute inset-0 flex items-center justify-center">
              <CookieConsent onAccept={handlerCookiesAccept}/>
            </div>
          )}
    </main>) :
    <div>Loading...</div>
    }
    </>
  )
}
