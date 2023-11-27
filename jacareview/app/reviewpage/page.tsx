"use client"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth"
import { initFirebase } from "@/firebase/firebaseapp"
import { useRouter } from "next/navigation";
import '../globals.css'
import ReviewForm from "@/components/ReviewForm";
import Navbar from "@/components/Navbar";

export default function ReviewPage() {

    initFirebase();
    const auth = getAuth(); 
    const [user, loading] = useAuthState(auth);
    const router = useRouter();
    // const [user_uid, set]
    const [userUid, setUserUid] = useState<String | null> (null)
    const [restaurantPlaceId, setRestarantPlaceId] = useState<String | null>(null)
    const restaurantName = 'aaa' //need to pass the restaurant's name
    // const { restaurantPlaceId, restaurantName } = router.query;

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setUserUid(uid);
        setRestarantPlaceId('aa') 
        } else {
            router.push("/")
        }
    });

    return (
        <div className="min-h-screen overflow-auto">
            <Navbar /> 
            {/* need to pass the user's photo from google for navbar  */}
            <ReviewForm userUid={String(userUid)} restaurantPlaceId={String(restaurantPlaceId)} restaurantName={String(restaurantName)} />
        </div>
    )

}