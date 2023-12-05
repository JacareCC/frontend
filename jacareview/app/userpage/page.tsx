"use client"

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth"
import { initFirebase } from "@/firebase/firebaseapp"
import { useRouter } from "next/navigation";
import '../globals.css'
import NavbarUser from "@/components/NavBarUser";
import { useEffect, useState } from "react";
import InfoUser from "@/components/userPage/InfoUser";
import RestViewed from "@/components/userPage/RestViewed";
import VerifyUser from "../globalfunctions/TokenVerification";
import ClaimButton from "@/components/userPage/ClaimButton";


export default function UserPage(){
    const[statusCode, setStatusCode] = useState<number|null>(null);

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

    interface NavbarUserProps {
        logoSrc: string | null | undefined;
        userPhotoSrc: string | null | undefined;
        userName: string | null | undefined
    }

      
        const[userPhoto, setUserPhoto] = useState<string | undefined>(undefined);
        const[userName, setUserName] = useState<string | undefined>(undefined);
        const[email, setEmail] = useState<string | undefined>(undefined);
        const[birthday, setBirthday] = useState<string | undefined>(undefined);
        const[uid, setUid] = useState<string|null |undefined> (null);
        const[points, setPoints] = useState<string |null|undefined>(null);

        useEffect(() => {
            if(user){
            setUid(user?.uid)
            }
        }, [user]);
    
        useEffect(()=>{
            if(uid){
            getUserData();
            }
        }, [uid])

        async function getUserData(){
            const results = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/profile/`, {
                method: 'GET',
                headers: {
                  "Content-Type": "application/json" , 
                  "Authorization" : `${uid}`
                }
              })
                  .then(response => {return response.json()})
                  .then(data => {
                    setEmail(data.success.user.email);
                    setBirthday(data.success.user.birthday);
                    if(data.success.user.username !== null) setUserName(data.success.user.username);
                    setPoints(data.success.points);
                })
            }

        useEffect (() => {
          if(user) {
            if(user.photoURL)
            setUserPhoto(user?.photoURL)
            if(user.displayName)
            setUserName(user?.displayName)
          }
        }, [user]);
    console.log(uid)
    return(
        <div>
            <NavbarUser userName={userName} userLevel={points} userPhotoSrc={userPhoto}/>
            <div className="max-w-screen-md mx-auto">

                <div className="">
                    <InfoUser email={email} birthday={birthday} name={userName} />   
                </div>
                <div>
                    <RestViewed />
                </div>
                <div className="px-4">
                    <ClaimButton user_uid={uid} />
                </div>
            </div>
        </div>
    )
}