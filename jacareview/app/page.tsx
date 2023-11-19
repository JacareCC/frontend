"use client"

import { initFirebase } from "@/firebase/firebaseapp"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth"
import { useEffect, useState } from "react";

export default function Home() {
  const [uid, setUid] = useState<string | null>(null)

  initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth)
  const router = useRouter();


  useEffect(() => {
    fetch('http://localhost:8000/auth', {
      method: 'GET',
      mode: "no-cors",
      headers: new Headers({
        'Authorization': `${uid}`, 
        'Content-Type': 'application/json'
    }), 
      })
        .then(response => response.text())
        .then(text => console.log(text))

        console.log(uid)
  },[uid])

  if(loading) {
    return <div>Loading...</div>
  }

  if(user){
    // fetch('http://localhost:8000/auth', {
    //   method: 'GET',
    //   mode: "no-cors",
    //   headers: {
    //     'Content-Type': 'application/json',
    //     "Authorization": `${uid}`
    //   }})
    //     .then(response => response.text())
    //     .then(text => console.log(text))
     
      // router.push("/dashboard")
    }
  

    
  

  async function signIn () {
    const result = await signInWithPopup(auth, provider);
    setUid(result.user.uid)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Jacareview
      <div>
      <button onClick={signIn}>Sign In!</button>
      </div>
    </main>
  )
}
