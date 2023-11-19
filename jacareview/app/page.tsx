"use client"

import { initFirebase } from "@/firebase/firebaseapp"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth"
import { useState } from "react";

export default function Home() {
  const [uid, setUid] = useState<string | null>(null)

  initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth)
  const router = useRouter();

  if(loading) {
    return <div>Loading...</div>
  }

  if(user){
    getData();
    // router.push("/dashboard")
  }

  async function signIn () {
    const result = await signInWithPopup(auth, provider);
    
    setUid(result.user.uid)
  }

  //handler function 
  async function getData(url = "http://localhost:8000/auth") {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${uid}`
      }
    });
    return response.json(); // parses JSON response into native JavaScript objects
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
