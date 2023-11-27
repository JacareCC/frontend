"use client"
import {useState, useEffect} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initFirebase } from "@/firebase/firebaseapp";
import { setuid } from "process";

export default function RestaurantsSeen(){
    const [historyData, SetHistoryData] = useState<any>(null);
    const [uid, setUid] = useState<string|null |undefined> (null);

    initFirebase();
    const auth = getAuth(); 
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        if(user){
        setUid(user?.uid)
        }
    }, [user]);

    useEffect(()=>{
        getHistoryData();
    }, [uid])

    //helper 
    async function getHistoryData(){
        const results = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/history`, {
            method: 'GET',
            headers: {
              "Content-Type": "application/json" , 
              "Authorization" : `${uid}`
            }
          })
              .then(response => {return response.json()})
              .then(data => {SetHistoryData(data) });
        }

    

    return (

    <div>map of the results from request of ones clicked</div>
    )
}