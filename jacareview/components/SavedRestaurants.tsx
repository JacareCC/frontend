"use client"
import {useState, useEffect} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initFirebase } from "@/firebase/firebaseapp";

export default function SavedRestaurants(){
    const [savedData, setSavedData] = useState<any>(null);
    const [fetchedData, setFetchedData] = useState<boolean>(false);
    const [uid, setUid] = useState<string| null>(null);
    const [restaurantId, setRestaurantId] = useState<string |null>(null);

    initFirebase();
    const auth = getAuth(); 
    const [user, loading] = useAuthState(auth);

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

    async function undoSaveRestaurant(event:any){
        const restaurantIdString:string = event.target.getAttribute("a-key");
        setRestaurantId(restaurantIdString);
        const results = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/favorites/remove/`, {
            method: 'PATCH',
            headers: {
              "Content-Type": "application/json" , 
            },
            body: JSON.stringify({uid: uid, restaurantId: restaurantId})
          })
              .then(response => {return response.json()})
        }

    return (
    <div>
        {savedData === "No saved restaurants" && (
            <div>No saved restaurants</div>
        )}
        {fetchedData && (

            savedData.map((element:any, index:number) => {
            return <div>
                <div key={index}>{element}</div>
                <button onClick={undoSaveRestaurant} a-key={element.restaurant_id} key={`a${index}`}>Unsave</button>
            </div>
        }))
        }

    </div>
    )
}