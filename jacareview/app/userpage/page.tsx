"use client"

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth"
import { initFirebase } from "@/firebase/firebaseapp"
import { useRouter } from "next/navigation";
import '../globals.css'
import Navbar from "@/components/Navbar";
import Card from "@/components/CardButton";

import jacaDate from 'public/jaca-date.png'
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

    return(
        <div className="">
            <p>hello</p>
            <Navbar/> 
            <div onClick={toRestaurantsSeen}>Visited Restaurants</div>
            <div onClick={toSavedRestaurants}>Saved Restaurants</div>
            <div onClick={toClaimPage}>Claim a Restaurant</div>
            <div className="flex flex-col items-center sm:flex-row gap-4 md:shadow-lg m-2 my-4 rounded p-1" >

            <Card title='Visited Restaurants'
                description='ldddsasdaisjdaioala'
                imageSrc={jacaDate}
                />
            </div>
            <></>
        </div>
    )
}