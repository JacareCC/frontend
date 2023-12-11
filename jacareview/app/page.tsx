"use client"

import { initFirebase } from "@/firebase/firebaseapp"
import { getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import CookieConsent from "@/components/Cookies";
import TermsAndConditions from "@/components/landingPage/TermsAndConditions";
import './globals.css'
import Image from "next/image";
import googleIcon from '../public/google.png'
import logoHome from '../public/logo-home-bgnashi.png'
import { Check } from 'lucide-react'
import VerifyUser from "./globalfunctions/TokenVerification";
import LoadingAnimation from "@/components/loading/Loading";
import TeamCard from "@/components/landingPage/MyCard";
import LandingPageSlideshow from "@/components/landingPage/landingPageSlides/LandingPageSlideShow";
import Will from "../public/Will-Photo.png"


export default function Home() {
  const [uid, setUid] = useState<string | null | undefined>(null);
  const [statusCode, setStatusCode] = useState<number | null> (null)
  const [termsAgreed, setTermsAgreed] = useState<boolean>(false)
  const [toggleAgreement, setToggleAgreement] = useState<boolean>(false)
  const [registrationReady, setRegistrationReady] = useState<boolean>(false)
  const [loginTry, setLoginTry] = useState<boolean>(false)
  const [cookiesAccepted, setCookiesAccepted] = useState<boolean>(false);
  const [showConsent, setShowConsent] = useState<boolean>(true);
  const sectionRef = useRef<HTMLDivElement>(null);


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
    if(statusCode === 400){
      router.push("/search");
    }
  },[statusCode])



  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    setCookiesAccepted(!!cookiesAccepted);
    setShowConsent(!cookiesAccepted);
  }, [showConsent]);

  useEffect(() => {
    if(termsAgreed){
      handleRegister();
      
    }
  }, [termsAgreed]);

  useEffect(() => {
    if(user && !statusCode && termsAgreed){
      handleUserRegistration(user.uid, user.email);
   
    }
  }, [user]);


  async function handleUserRegistration(uid: string, email: string| null){
    const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}register/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json" , 
      },
      body : JSON.stringify({uid: uid, email: user?.email})
    })
        .then(response => response.status )
        .then(status => setStatusCode(status));   
  }


  
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
      setRegistrationReady(true);
      }
    } catch (error: any) {
      if (error.code === 'auth/cancelled-popup-request') {
        console.log('Popup request cancelled');
      } else {
        console.error('Error during sign-in:', error);
      }
    }
  }

  const scrollToSection = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
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
        <div className="flex w-auto justify-end my-2 shadow-lg shadow-indigo-500/40 rounded">
        <button className="text-jgreen p-2 px-4 my-4 cursor-pointer font-semibold" onClick={scrollToSection}>
              About Us
            </button>
        </div>
            {!statusCode && user? (
              <div className="flex justify-center items-center ">
                <LoadingAnimation/>
              </div>
            ) : (
              <>  


                <div className="flex flex-col items-center sm:flex-row  gap-4  mx-2 mb-4 rounded p-1">
                  <div className="flex items-center shadow-lg shadow-indigo-500/40 rounded basis-1/2">
                    <Image priority={true} className="" src={logoHome} alt="logo" width={500} height={500} />
                  </div>


                  
                  <div className="flex flex-col justify-center items-center">
                  <div className="flex flex-col justify-center items-center sm: h-1/5">
                  <div className="flex flex-col object-fill sm: h-[10vh] items-center fixed top-1/2 space-y-2 ml-5 mr-5 p-10  max-w-full relative">
                    
                      
            
                      <button onClick={handleToggleToTerms} className="bg-emerald-100 text-indigo-500 p-2 rounded shadow-lg shadow-indigo-500/40 w-full sm:w-auto flex justify-center items-center" >
                       <div className="flex items-center px-10">
                          <Image   priority={true} src={googleIcon} alt="Google Icon" width={20} height={20} />
                          <span className="ml-2 text-base sm:text-lg lg:text-xl whitespace-nowrap">Sign Up!</span>
                        </div>
                      </button>
                    
                    <div className="flex">
                      {termsAgreed ? (<Check style={{ width: '40px', height: '30px', stroke: 'var(--jyellow)' }} />) : null}
                    </div>
                    {toggleAgreement && (
                      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black h-screen w-screen bg-opacity-50">
                      <TermsAndConditions setTermsAgreed={setTermsAgreed} setToggleAgreement={setToggleAgreement} />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col object-fill sm: h-[10vh] items-center fixed top-1/2 space-y-2 ml-5 mr-5 mb-5 p-10  max-w-full relative">
                    <h2 className="text-sm">Already have an account?</h2>
                    <button className="bg-emerald-100 text-indigo-500 p-2 rounded shadow-lg shadow-indigo-500/40 w-full sm:w-auto flex justify-center items-center" onClick={signIn}>
                      <div className="flex items-center px-10">
                        <Image priority={true} src={googleIcon} alt="Google Icon" width={20} height={20} />
                        <span className="ml-2  whitespace-nowrap">Sign In</span>
                      </div>
                    </button>
                    </div>
                  </div>
                  </div>
                </div>
                  <div className="flex flex-col  gap-3 ">
                   <LandingPageSlideshow/>
                    </div>
                   </>
            )}
            {showConsent && (
              <div className="absolute z-2 inset-0 flex items-center justify-center">
                <CookieConsent onAccept={handlerCookiesAccept} />
              </div>
            )}
              <section ref={sectionRef} className="pt-20 md:pb-32  bg-indigo-100 md:mb-8 rounded shadow-lg shadow-indigo-500/40">
                <div className="container mx-auto px-4">
                  <div className="flex flex-wrap justify-center text-center mb-24">
                    <div className="w-full lg:w-6/12 px-4">
                      <h2 className="text-4xl font-semibold">Our team</h2>
                      <p className="text-lg leading-relaxed m-4 text-gray-600">
                        
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center">
                    <TeamCard
                      imgSrc={'https://avatars.githubusercontent.com/u/55517364?s=400&u=e267aa5b3d8479ce7da963f204c85c07adb92dee&v=4'}
                      name="Júlio Gonzalez"
                      role="Project Owner"
                      socialLinks={[
                        { icon: 'https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png', color: '', url: 'https://www.linkedin.com/in/j%C3%BAlio-gonzalez-6000a6299/' },
                        { icon: 'https://cdn1.iconfinder.com/data/icons/picons-social/57/github_rounded-512.png', color: '', url: 'https://github.com/GONZALEZ-RODRIGUES' },
                      ]}
                    />
                    <TeamCard
                      imgSrc={Will.src}
                      name="Will Brammer"
                      role="Tech Lead"
                      socialLinks={[
                        { icon: 'https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png', color: '', url: 'https://www.linkedin.com/in/william-brammer/' },
                        { icon: 'https://cdn1.iconfinder.com/data/icons/picons-social/57/github_rounded-512.png', color: '', url: 'https://github.com/NabbeunNabi' },
                      ]}
                    />
                    <TeamCard
                      imgSrc={'../public/jaca-business.png'}
                      name="Kai kun"
                      role="FullStack Engenner"
                      socialLinks={[
                        { icon: 'https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png', color: '', url: 'https://www.linkedin.com/in/j%C3%BAlio-gonzalez-6000a6299/' },
                        { icon: 'https://cdn1.iconfinder.com/data/icons/picons-social/57/github_rounded-512.png', color: '', url: 'https://github.com/GONZALEZ-RODRIGUES' },
                      ]}
                    />
                  </div>
                </div>
              </section>
          </main></div></>
      ) : (
        <LoadingAnimation/>
      )}
      
    </>
  )
}
