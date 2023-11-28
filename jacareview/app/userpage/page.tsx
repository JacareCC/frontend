"use client"

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth"
import { initFirebase } from "@/firebase/firebaseapp"
import { useRouter } from "next/navigation";
import RestaurantsSeen from "@/components/RestaurantsSeen";
import '../globals.css'
import Navbar from "@/components/Navbar";
export default function UserPage(){

    initFirebase();
    const auth = getAuth(); 
    const [user, loading] = useAuthState(auth);
    const router = useRouter();


    return(
        <div className="">
            <Navbar/> 
            <RestaurantsSeen/>
        </div>
    )
}