"use client"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth"
import { initFirebase } from "@/firebase/firebaseapp"
import { useRouter, useSearchParams } from "next/navigation";
import '../globals.css'
import ReviewForm from "@/components/formComponents/ReviewForm";
import NewNav from "@/components/navbarComponents/NewNav";
import VerifyUser from "../globalfunctions/TokenVerification";

export default function ReviewPage() {

    initFirebase();
    const auth = getAuth(); 
    const [user, loading] = useAuthState(auth);
    const [userUid, setUserUid] = useState<String | null> (null)
    const [restaurantPlaceId, setRestarantPlaceId] = useState<string | null>(null)
    const[statusCode, setStatusCode] = useState<number|null>(null);
    
    const restaurantName = 'aaa' //need to pass the restaurant's name
    const params = useSearchParams()
    const restaurant = params.get("restaurant");
    const router = useRouter();
    
  

    useEffect(()=>{
        setRestarantPlaceId(restaurant);
    },[])
    
   
    onAuthStateChanged(auth, (user) => {
        if (user) {
        VerifyUser(user.uid, setStatusCode);
        const uid = user.uid;
        setUserUid(uid);
        } else {
            router.push("/")
        }
    });

    return (
        <>
            <div className="" >
            <NewNav /> 
                <ReviewForm userUid={String(userUid)} restaurantPlaceId={String(restaurantPlaceId)} restaurantName={String(restaurantName)} />
            </div>
        </>
    )

}