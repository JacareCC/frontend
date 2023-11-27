"use client"
import {useState, useEffect} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initFirebase } from "@/firebase/firebaseapp";
import moment from "moment";
import Link from "next/link";
// import { setuid } from "process";

export default function RestaurantsSeen(){
    const [historyData, SetHistoryData] = useState<any>(null);
    const [uid, setUid] = useState<string|null |undefined> (null);
    const [restaurantId, setRestaurantId] = useState<string|null>(null);

    initFirebase();
    const auth = getAuth(); 
    const [user, loading] = useAuthState(auth);
    // const router = useRouter();

    useEffect(() => {
        if(user){
        setUid(user?.uid)
        }
    }, [user]);

    useEffect(()=>{
        getHistoryData();
    }, [uid])

    useEffect(() => {
        console.log(historyData);
    }, [historyData]);

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
              .then(data => {SetHistoryData(data.success) });
        }

    async function saveRestaurant(event:any){
        const restaurantIdString:string = event.target.getAttribute("a-key");
            setRestaurantId(restaurantIdString);
            const results = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/favorites/add/`, {
                method: 'PATCH',
                headers: {
                  "Content-Type": "application/json" , 
                },
                body: JSON.stringify({uid: uid, restaurantId: restaurantId})
              })
                  .then(response => {return response.json()})
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
        <>
        { !historyData ?
    <div>Loading ...</div>:
            <div>
                {historyData.map((element:any, index:number) => {
                return <div>
                <div key={`a${index}`}>Date Visited: {moment(element.date_visited).format('MM/DD/YYYY')}</div>
                <Link href={`/reviewpage/?restaurant=${element.restaurant_id_id}`}>Review</Link>
                {!element.saved ? <button onClick={saveRestaurant} a-key={element.restaurant_id_id}>Save</button>:<button onClick={undoSaveRestaurant} a-key={element.restaurant_id_id}>Unsave</button>}
                </div>
            })}
            </div>
        }
    </>
    )
}