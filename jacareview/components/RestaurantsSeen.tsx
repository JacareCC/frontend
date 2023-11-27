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

    // function handlePathToReview(event:any){
        
    //     setRestaurantId(event.target.getAttribute("a-key"))
    //     router.push({pathname: "/reviewpage", query: {restaurantId: restaurantId })
    // }
    

    return (
        <>
        { !historyData ?
    <div>Loading ...</div>:
            <div>
                {historyData.map((element:any, index:number) => {
                return <div>
                <div key={`a${index}`}>Date Visited: {moment(element.date_visited).format('MM/DD/YYYY')}</div>
                <Link href={`/reviewpage/?restaurant=${element.restaurant_id_id}`}>Review</Link>
                </div>
            })}
            </div>
        }
    </>
    )
}