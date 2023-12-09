"use client"

import { initFirebase } from "@/firebase/firebaseapp"
import { getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CookieConsent from "@/components/Cookies";
import TermsAndConditions from "@/components/TermsAndConditions";
import './globals.css'
import Image from "next/image";
import googleIcon from '../public/google.png'
import logoHome from '../public/logo-home-bgnashi.png'
import jacareReview from '../public/jaca-review.png'
import jacareEat from '../public/jaca-eat.png'
import jacaDate from '../public/jaca-date.png'
import jacaBusiness from '../public/jaca-business.png'
import { Check } from 'lucide-react'
import NavbarHome from "@/components/NavbarHome";
import VerifyUser from "./globalfunctions/TokenVerification";
import LoadingAnimation from "@/components/loading/Loading";



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
    VerifyUser(user.uid, setStatusCode);
    }
  }, [uid])

  useEffect(() => {
    if(statusCode === 200 || statusCode === 201){
      router.push("/search");
    }
    if(statusCode === 401){
      setLoginTry((prev:boolean) => !prev);
    }
    if(statusCode === 400){
      setRegistrationReady((prev:boolean) => !prev);
    }
  },[statusCode])


  useEffect(() =>{
    if(loginTry){{
    VerifyUser(user?.uid, setStatusCode)
    }
  }
  
  }, [loginTry])

  useEffect(() =>{
    if(registrationReady){
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}register/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json" , 
      },
      body : JSON.stringify({uid: uid, email: user?.email})
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
    setCookiesAccepted(true);
    setShowConsent(false);
  }


  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      
      // Handle successful sign-in
      setUid(result.user.uid);
      setLoginTry((prev:boolean) => !prev);
    } catch (error: any) {
      if (error.code === 'auth/cancelled-popup-request') {
        console.log('Popup request cancelled');
      } else {
        console.error('Error during sign-in:', error);
      }
    }
  }
  

  //handler
  function handleToggleToTerms(){
    setToggleAgreement((prev:boolean) => !prev)
  }

  

  async function handleRegister(){
    try {
      const result = await signInWithPopup(auth, provider);
      
      // Handle successful sign-in
      if(user){
      setUid(result.user.uid);
      setRegistrationReady((prev:boolean) => !prev);
      
      }
    } catch (error: any) {
      if (error.code === 'auth/cancelled-popup-request') {
        console.log('Popup request cancelled');
      } else {
        console.error('Error during sign-in:', error);
      }
    }
  }

  statusCode !== 200 && statusCode !== 201

  return (
    <>
      {cookiesAccepted ? null : (<div className="absolute inset-0 bg-black bg-opacity-0 z-3"></div>)}
      {statusCode !== 200 && statusCode !== 201 ? (
        <>
        <div className="">
        <main className="container mx-auto lg:px-8 max-w-screen-lg">
            {!statusCode && user? (
              <div className="flex justify-center items-center">
              <LoadingAnimation/>
              </div>
            ) : (
              <>  
                <div className="flex flex-col items-center sm:flex-row gap-4  mx-2 pt-4 mb-4 rounded p-1">
                  <div className="flex items-center shadow-2xl m-2 rounded basis-1/2">
                    <Image priority={true} className="" src={logoHome} alt="logo" width={500} height={500} />
                  </div>
                  <div className="flex flex-col items-center basis-1/2 py-10  max-w-full">
                    <button className="bg-emerald-100 text-indigo-500 p-2 rounded shadow-lg shadow-indigo-500/40 w-full sm:w-auto flex justify-center items-center" onClick={signIn}>
                      <div className="flex items-center px-10">
                        <Image priority={true} src={googleIcon} alt="Google Icon" width={20} height={20} />
                        <span className="ml-2  whitespace-nowrap">Sign In!</span>
                      </div>
                    </button>
                  </div>
                </div>
                  <div className="flex flex-col  gap-3 ">
                    <div className="shadow-2xl m-2 rounded bg-gradient-to-r from-indigo-100 from-10% via-sky-100 via-30% to-emerald-100 to-90%">
                    <div className="flex p-2 gap-4">
                      <div className="">
                        <Image className="rounded-lg" src={jacareEat} alt="logo" width={400} height={400} />
                      </div>
                      <div className="mx-auto">
                        <div><h2 className="font-yaro text-jgreen text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl" >Simple and Fast Search</h2></div>
                        <div><p className="text-zinc-700  pl-2 pt-2 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">Explore a variety of culinary options nearby. Finding the perfect restaurant is now easier than ever.</p>
                      </div>
                      </div>
                    </div>
                    </div>
                    <div className="shadow-2xl m-2 rounded bg-gradient-to-r from-indigo-100 from-10% via-sky-100 via-30% to-emerald-100 to-90% text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl" >
                    <div className="flex p-2 gap-4">
                      <div className="">
                        <div><h2 className="font-yaro text-jgreen" >Anonymous Reviews</h2></div>
                        <div><p className="text-zinc-700 pl-2 pt-2">Your opinions matter, and we want you to feel free to express them without any concerns.</p>
                      </div>
                      </div>
                      <div className="">
                        <Image priority={true} className="rounded-lg" src={jacareReview} alt="logo" width={400} height={400} />
                      </div>
                    </div>
                    </div>
                    <div className="shadow-2xl m-2 rounded bg-gradient-to-r from-indigo-100 from-10% via-sky-100 via-30% to-emerald-100 to-90% text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                    <div className="flex p-2 gap-4">
                      <div className="">
                        <Image priority={true} className="rounded-lg" src={jacaDate} alt="logo" width={400} height={400} />
                      </div>
                      <div className="">
                        <div><h2 className="font-yaro text-jgreen" >Incredible Rewards</h2></div>
                        <div><p className="text-zinc-700  pl-2 pt-2">Earn exclusive rewards for reviewing. The more you share, the more benefits you receive.</p>
                      </div>
                    </div>
                      </div>
                    </div>
                    <div className="shadow-2xl m-2 rounded bg-gradient-to-r from-emerald-100 from-10% via-sky-100 via-30% to-indigo-100 to-90% text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                      <div className="flex p-2 gap-4">
                        <div className="">
                          <div><h2 className="font-yaro text-jgreen" >For your business</h2></div>
                          <div><p className="text-zinc-700  pl-2 pt-2">Enhance Your Online Presence. Receive Genuine Feedback. Reward Your Customers.</p>
                        </div>
                        </div>
                        <div className="">
                          <Image priority={true} className="rounded-lg" src={jacaBusiness} alt="logo" width={400} height={400} />
                        </div>
                      </div>
                    </div>
                    </div>
                    <div className="flex flex-col items-center fixed top-1/2 space-y-2 ml-5 mr-5 p-10  max-w-full relative">
                    {termsAgreed ? (
                      <button className="bg-emerald-100 text-indigo-500  p-2 rounded shadow-lg shadow-indigo-500/40 w-full sm:w-2/3 lg:w-1/2 flex justify-center items-center" onClick={handleRegister}>
                        <div className="flex items-center">
                          <Image priority={true} src={googleIcon} alt="Google Icon" width={20} height={20} />
                          <span className="ml-2">Sign Up!</span>
                        </div>
                      </button>
                    ) : (
                      <button onClick={handleToggleToTerms} className="bg-emerald-100 text-indigo-500  p-2 rounded shadow-lg shadow-indigo-500/40 w-full sm:w-2/3 lg:w-1/2 flex justify-center items-center">
                        <div className="flex items-center">
                          <Image   priority={true} src={googleIcon} alt="Google Icon" width={20} height={20} />
                          <span className="ml-2 text-base sm:text-lg lg:text-xl">Sign Up!</span>
                        </div>
                      </button>
                    )}
                    <div className="flex ">
                      <h2 className="mb-0.5 mt-4 underline  ml-2 text-base sm:text-lg lg:text-xl" onClick={handleToggleToTerms}>
                        Click here to read and agree to Terms and Conditions before Registration
                      </h2>
                      {termsAgreed ? (<Check style={{ width: '40px', height: '30px', stroke: 'var(--jyellow)' }} />) : null}
                    </div>
                    {toggleAgreement && (
                      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black h-screen w-screen bg-opacity-50">
                      <TermsAndConditions setTermsAgreed={setTermsAgreed} setToggleAgreement={setToggleAgreement} />
                      </div>
                    )}
                  </div></>
            )}
            {showConsent && (
              <div className="absolute z-2 inset-0 flex items-center justify-center">
                <CookieConsent onAccept={handlerCookiesAccept} />
              </div>
            )}
          </main></div></>
      ) : (
        <LoadingAnimation/>
      )}
      
    </>
  )
}
