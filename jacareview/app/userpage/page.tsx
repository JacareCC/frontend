"use client"

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth"
import { initFirebase } from "@/firebase/firebaseapp"
import { useRouter } from "next/navigation";
import RestaurantsSeen from "@/app/restaurantsvisited/RestaurantsSeen";
import '../globals.css'
import Navbar from "@/components/Navbar";
export default function UserPage(){

    initFirebase();
    const auth = getAuth(); 
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    function toRestaurantsSeen(){
        router.push("/restaurantsvisited");
    }

    function toSavedRestaurants(){
        router.push("/savedrestaurants");
    }

    return(
        <div className="">
            <Navbar/> 
            <div onClick={toRestaurantsSeen}>Visited Restaurants</div>
            <div onClick={toSavedRestaurants}>Saved Restaurants</div>
            <></>
        </div>
    )
}