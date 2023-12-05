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
import ClaimForm from "@/components/formComponents/ClaimForm";


export default function ClaimPage() {

    initFirebase();
    const auth = getAuth(); 
    const [user, loading] = useAuthState(auth);
    const [userUid, setUserUid] = useState<String | null> (null)
    const router = useRouter();

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
            <ClaimForm userUid={String(userUid)}  />
        </>
    )

}