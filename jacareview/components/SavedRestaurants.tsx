"use client"
import {useState, useEffect} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initFirebase } from "@/firebase/firebaseapp";
import { useRouter } from "next/navigation";
import Navbar from "./Navbar";


export default function SavedRestaurants(){
    const [savedData, setSavedData] = useState<any>(null);
    const [fetchedData, setFetchedData] = useState<boolean>(false);
    const [uid, setUid] = useState<string| null>(null);
    const [restaurantId, setRestaurantId] = useState<string |null>(null);
    const [historyId, setHistoryId] = useState<number | null> (null);
    const [refreshCount, setRefreshCount] = useState<number | null>(null)

    initFirebase();
    const auth = getAuth(); 
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
        if(user){
            getSavedRestaurants()
            setUid(user.uid)
        }
    }, [user]);

    useEffect(() => {
        if(savedData && savedData !== "No saved restaurants"){
            setFetchedData(true);
        }
        console.log(savedData);
    }, [savedData])

    useEffect(()=>{
        if(restaurantId){
            undoSaveRestaurant();
            setRefreshCount(1);
        }
    },[restaurantId]);

    useEffect(()=>{
        if(refreshCount){
        window.location.reload();
        }
    },[refreshCount]);

   
async function getSavedRestaurants(){
    const results = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/favorites/`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json" , 
          "Authorization" : `${user?.uid}`
        }
      })
          .then(response => {return response.json()})
          .then(data => {setSavedData(data.message) });
    }

    function getRestaurantID(event:any){
        const restaurantIdString:string = event.target.getAttribute("a-key");
        const historyIdNumber:number = event.target.getAttribute("b-key");
        setRestaurantId(restaurantIdString);
        setHistoryId(historyIdNumber);
    }

    async function undoSaveRestaurant(){
        const results = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/favorites/remove/`, {
            method: 'PATCH',
            headers: {
              "Content-Type": "application/json" , 
            },
            body: JSON.stringify({uid: uid, restaurantId: restaurantId, id:historyId})
          })
              .then(response => {return response.json()})
        }
    

    return (
    <div>
        <Navbar/>
        {savedData === "No saved restaurants" && (
            <div>No saved restaurants</div>
        )}
        {fetchedData && (

            savedData.map((element:any, index:number) => {
            return <div key={`a${index}`}>
                <div key={index}>{element.name}</div>
                <button key={`b${index}`} onClick={getRestaurantID} a-key={element.restaurant_id_id} b-key={element.id}>Unsave</button>
            </div>
        }))
        }

    </div>
    )
}