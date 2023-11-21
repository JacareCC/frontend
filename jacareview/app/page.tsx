"use client"

import { initFirebase } from "@/firebase/firebaseapp"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth"
import { useEffect, useState } from "react";
import CookieConsent from "@/components/Cookies";
import TermsAndConditions from "@/components/TermsAndConditions";

export default function Home() {
  const [uid, setUid] = useState<string | null>(null);
  const [statusCode, setStatusCode] = useState<number | null> (null)
  const [termsAgreed, setTermsAgreed] = useState<boolean>(false)
  const [toggleAgreement, setToggleAgreement] = useState<boolean>(false)
  const [registrationReady, setRegistrationReady] = useState<boolean>(false)


  initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth)
  const router = useRouter();


  useEffect(() => {
    if(statusCode === 200 || statusCode === 201){
      router.push("/dashboard")    }
  },[statusCode])

  if(loading) {
    return <div>Loading...</div>
  }

  useEffect(() => {
    if(user && uid){
    fetch(`${process.env.BASE_URL}` + `login/`, {
      method: 'GET',
      headers: {
        'Authorization': `${uid}`, 
      }
    })
        .then(response => response.status)
        .then(status => setStatusCode(status));
    }

    if(user && uid && registrationReady){
      fetch(`${process.env.BASE_URL}` + `login/`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json" , 
        },
        body : JSON.stringify({uid: uid})
      })
          .then(response => response.status)
          .then(status => setStatusCode(status));
      } 
},[uid, registrationReady])

  async function signIn () {
    const result = await signInWithPopup(auth, provider);
    setUid(result.user.uid)
  }

  //handler
  function handleToggleToTerms(){
    setToggleAgreement((prev:boolean) => !prev)
  }

  return (
    <main className="flex relative min-h-screen flex-col items-center justify-between p-24 z-0">
      Jacareview
      <div>
      <button onClick={signIn}>Sign In!</button>
      </div>
      <div>
        { termsAgreed ? <button onClick={signIn}>Register</button> :
        <button>Register</button>}
        <h2 onClick={handleToggleToTerms}>Click here to read and agree to Terms and Conditions before Registration</h2>
       {toggleAgreement && (<TermsAndConditions setTermsAgreed={setTermsAgreed} setToggleAgreement={setToggleAgreement}/>)}
      </div>
      <CookieConsent/>
    </main>
  )
}
