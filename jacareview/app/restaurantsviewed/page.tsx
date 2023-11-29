"use client"
import {useState, useEffect} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initFirebase } from "@/firebase/firebaseapp";
import moment from "moment";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import "../globals.css"

export default function RestaurantsSeen(){
    const [historyData, setHistoryData] = useState<any>(null);
    const [historyDataFiltered, setHistoryDataFiltered] = useState<any>(null);
    const [uid, setUid] = useState<string|null |undefined> (null);
    const [restaurantId, setRestaurantId] = useState<string|null>(null);
    const [historyId, setHistoryId] = useState<number | null> (null);
    const [triggerRefresh, setTriggerRefresh] = useState<number | null>(null)

    initFirebase();
    const auth = getAuth(); 
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
        if(user){
        setUid(user?.uid)
        }
    }, [user]);

    useEffect(()=>{
        if(uid){
        getHistoryData();
        }
    }, [uid])

    useEffect(() => {
        if(historyData){
            filterToUniqueRestaurants(historyData, "restaurant_id_id");
        }
    
    }, [historyData]);

    useEffect(() => {
        if(restaurantId && historyId){
            changeSaveRestaurant();
        }
    }, [restaurantId]);

    useEffect(() => {
        if(triggerRefresh === 200){
           window.location.reload();
        }
    }, [triggerRefresh]);

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
              .then(data => {setHistoryData(data.success); setTriggerRefresh(data.status) });
        }

    function getRestaurantID(event:any){
            const restaurantIdString:string = event.target.getAttribute("a-key");
            const historyIdNumber:number = event.target.getAttribute("b-key");
            setRestaurantId(restaurantIdString);
            setHistoryId(historyIdNumber);

    }

    async function changeSaveRestaurant(){
        const results = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/favorites/add/`, {
            method: 'PATCH',
            headers: {
              "Content-Type": "application/json" , 
            },
            body: JSON.stringify({uid: uid, restaurantId: restaurantId, id:historyId})
          })
              .then(response => { setTriggerRefresh(response.status); return response.json()})
              
        }
    

        function filterToUniqueRestaurants (myArr:any, key:string){
            let filteredHistory =  myArr.filter((obj:any, pos:any, arr:any) => {
                    return arr.map((mapObj:any) => mapObj[key]).indexOf(obj[key]) === pos;
                });
            
            setHistoryDataFiltered(filteredHistory);
        }
    
        function toProfilePage(){
            router.push("/userpage")
        }

    return (
        <div>
        <Navbar/>
        { !historyData ?
    <div>Loading ...</div>:
    <div>{historyData.length === 0 ? <div>No Restaurants Visited</div>:
            <div>
                {historyDataFiltered && (historyDataFiltered.map((element:any, index:number) => {
                return <div key={`b${index}`}>
                <div key={`c${index}`}>Restaurant: {element.name} </div>
                <div key={`a${index}`}>Date Visited: {moment(element.date_visited).format('MM/DD/YYYY')}</div>
                <Link href={`/reviewpage/?restaurant=${element.restaurant_id_id}`}>Review</Link>
                {!element.saved ? <button onClick={getRestaurantID} a-key={element.restaurant_id_id} b-key={element.id}>Save</button>:
                <button onClick={getRestaurantID} a-key={element.restaurant_id_id} b-key={element.id}>Unsave</button>}
                </div>
            }))}
            </div>}
            </div>
        }
    <button onClick={toProfilePage}>Back to Profile</button>
    </div>
    )
}