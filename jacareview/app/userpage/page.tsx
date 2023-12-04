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


export default function UserPage(){

    initFirebase();
    const auth = getAuth(); 
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    function toRestaurantsSeen(){
        router.push("/restaurantsviewed");
    }

    function toSavedRestaurants(){
        router.push("/savedrestaurants");
    }

    function toClaimPage(){
        router.push("/claimpage");
    }
    interface NavbarUserProps {
        logoSrc: string | null | undefined;
        userPhotoSrc: string | null | undefined;
        userName: string | null | undefined
      }
      
        const[ userPhoto, setUserPhoto] = useState<string | undefined>(undefined);
        const [userName, setUserName] = useState<string | undefined>(undefined);
        const[email, setEmail] = useState<string | undefined>(undefined);
        const[birthday, setBirthday] = useState<string | undefined>(undefined);

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
            <NavbarUser userName={userName} userLevel={'Baby'} userPhotoSrc={userPhoto}/>
            <div className="flex flex-col justify-center items-center">
                <InfoUser email={email} birthday={birthday} name={userName} />   
            </div>
            <div>

            </div>
        </div>
    )
}