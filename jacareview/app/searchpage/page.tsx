"use client"
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth"
import { initFirebase } from "@/firebase/firebaseapp"

export default function SearchPage() {
    initFirebase();
    const auth = getAuth(); 
    const [user, loading] = useAuthState(auth)

    return(
        <div>Welcome {user?.displayName}</div>
    )
}