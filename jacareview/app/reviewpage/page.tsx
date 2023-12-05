"use client"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth"
import { initFirebase } from "@/firebase/firebaseapp"
import { useRouter, useSearchParams } from "next/navigation";
import '../globals.css'
import ReviewForm from "@/components/formComponents/ReviewForm";
import Navbar from "@/components/Navbar";
// import { getDisplayName } from "next/dist/shared/lib/utils";

export default function ReviewPage() {

    initFirebase();
    const auth = getAuth(); 
    const [user, loading] = useAuthState(auth);
    const [userUid, setUserUid] = useState<String | null> (null)
    const [restaurantPlaceId, setRestarantPlaceId] = useState<string | null>(null)
    const restaurantName = 'aaa' //need to pass the restaurant's name
    const params = useSearchParams()
    const restaurant = params.get("restaurant");
    const router = useRouter();
    
  

    useEffect(()=>{
        setRestarantPlaceId(restaurant);
    },[])
    
    useEffect(()=>{
        console.log(restaurantPlaceId);
    },[restaurantPlaceId])
    

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setUserUid(uid);
        } else {
            router.push("/")
        }
    });

    return (
        <>
            <Navbar /> 
            <div className="max-w-screen-md mx-auto" >
                <ReviewForm userUid={String(userUid)} restaurantPlaceId={String(restaurantPlaceId)} restaurantName={String(restaurantName)} />
            </div>
        </>
    )

}