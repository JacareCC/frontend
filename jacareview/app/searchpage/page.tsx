"use client"
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth"
import { initFirebase } from "@/firebase/firebaseapp"

export default function SearchPage() {
    const [location, setLocation] = useState<any>(null);

    useEffect(()=>{
        console.log(location);
    },[location])

    initFirebase();
    const auth = getAuth(); 
    const [user, loading] = useAuthState(auth)

    function handleSubmitWithLocation(){
        if('geolocation' in navigator) {
            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                setLocation({ latitude, longitude });
            })
    }
}

    return(
        <>
        <div>Welcome {user?.displayName}</div>
        <button onClick={handleSubmitWithLocation}>Location</button>
        </>
    )
}