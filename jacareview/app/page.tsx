"use client"

import { initFirebase } from "@/firebase/firebaseapp"
import { getAuth, signInWithPopup, GoogleAuthProvider, getIdToken} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CookieConsent from "@/components/Cookies";
import TermsAndConditions from "@/components/TermsAndConditions";
import './page.css'
import './globals.css'
import Image from "next/image";
import googleIcon from '../public/google.png'
import { Check } from 'lucide-react'


export default function Home() {
  const [uid, setUid] = useState<string | null | undefined>(null);
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
    if(!loading){
    setUid(user?.uid);
    }
  },[loading]);

  useEffect(()=>{
    if(uid && user){
    checkForUser();
    }
  }, [uid])

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
    console.log(statusCode);
  },[statusCode])


  useEffect(() =>{
    if(loginTry){
    checkForUser()
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

  function checkForUser(){
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}login/`, {
      method: 'GET',
      headers: {
        'Authorization': `${uid}`, 
      }
    })
        .then(response =>  response.status)
        .then(status => setStatusCode(status));
  }

  async function handleRegister(){
    const result = await signInWithPopup(auth, provider);
    setUid(result.user.uid)
    setRegistrationReady((prev:boolean)=> !prev)
  }

  return (
    <>
      {cookiesAccepted ? null : (<div className="absolute inset-0 bg-black bg-opacity-0 z-3"></div>)}
      {statusCode !== 200 && statusCode !== 201 ? (
        <main className="bg-[url('../public/logo-home.png')] bg-no-repeat bg-top bg-contain h-screen bg-[center_top_5rem]">
          {loading ? (
            null
          ) : (
            <div className="flex flex-col items-center fixed top-1/2 space-y-2 ml-5 mr-5 p-10 bg-jgreen box-login max-w-full relative">
              <button className="button-4 w-full flex justify-center items-center" onClick={signIn}>
              <div className="flex items-center">
                <Image src={googleIcon} alt="Google Icon" width={20} height={20} />
                <span className="ml-2">Sign In!</span>
              </div>
              </button>
              {termsAgreed ? (
                <button className="button-4 w-full flex justify-center items-center" onClick={handleRegister}>
                  <div className="flex items-center">
                  <Image src={googleIcon} alt="Google Icon" width={20} height={20} />
                  <span className="ml-2">Sign Up!</span>
                  </div>
                </button>
              ) : (
                <button className="button-4 w-full flex justify-center items-center">
                  <div className="flex items-center">
                  <Image src={googleIcon} alt="Google Icon" width={20} height={20} />
                  <span className="ml-2">Sign Up!</span>
                  </div>
                </button>
              )}
              <div className="flex">
                <h2 className="mb-0.5 text-xs" onClick={handleToggleToTerms}>
                  Click here to read and agree to Terms and Conditions before Registration
                </h2>
                {termsAgreed ? ( <Check style={{ width: '40px', height: '30px', stroke: 'var(--jyellow)' }} /> ) : null }
              </div>
              {toggleAgreement && (
                <TermsAndConditions setTermsAgreed={setTermsAgreed} setToggleAgreement={setToggleAgreement} />
              )}
            </div>
          )}
          {showConsent && (
            <div className="cookie-consent-container absolute inset-0 flex items-center justify-center">
              <CookieConsent onAccept={handlerCookiesAccept} />
            </div>
          )}
        </main>
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
}
