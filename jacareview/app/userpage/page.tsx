"use client"

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth"
import { initFirebase } from "@/firebase/firebaseapp"
import { useRouter } from "next/navigation";
import '../globals.css'
import Navbar from "@/components/Navbar";
import Card from "@/components/CardButton";
import jacaDate from 'public/jaca-date.png'
import NavbarUser from "@/components/NavBarUser";
import { useEffect, useState } from "react";
import InfoUser from "@/components/userPage/InfoUser";
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";
import SavedRestaurants from "@/components/SavedRestaurants";
import { emit } from "process";
import RestViewed from "@/components/userPage/RestViewed";



export default function UserPage(){

    initFirebase();
    const auth = getAuth(); 
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

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
    
    return(
        <div className="">
            <NavbarUser userName={userName} userLevel={points} userPhotoSrc={userPhoto}/>
            <div className="flex flex-col justify-center items-center">
                <InfoUser email={email} birthday={birthday} name={userName} />   
            </div>
            <div>
                <RestViewed />
            </div>
            <div>
                <button className="bg-gray-100 text-indigo-500 p-2 rounded shadow-lg shadow-xl flex justify-center items-center">Claim a Restaurant</button>
            </div>
        </div>
    )
}