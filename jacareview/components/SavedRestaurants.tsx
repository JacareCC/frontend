"use client"
import {useState, useEffect} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initFirebase } from "@/firebase/firebaseapp";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoadingAnimation from "./loading/Loading";
import { Star } from "lucide-react";
import moment from "moment";


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
        if(restaurantId && historyId){
            undoSaveRestaurant();
            setRefreshCount(1);
        }
    },[restaurantId]);

    useEffect(()=>{
        if(refreshCount === 200){
        window.location.reload();
        }
    },[refreshCount]);

   
    async function getSavedRestaurants() {
        try {
          const results = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/favorites/all`, {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `${user?.uid}`
            }
          });
          const data = await results.json();
          setSavedData(data.message);
        } catch (error) {
          console.error('Error fetching saved restaurants:', error);
        }
    }

    function getRestaurantID(event:any){
        const restaurantIdString:string = event.target.getAttribute("a-key");
        const historyIdNumber:number = event.target.getAttribute("b-key");
        setRestaurantId(restaurantIdString);
        setHistoryId(historyIdNumber);
    }

    async function undoSaveRestaurant() {
        try {
          const results = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/favorites/remove/`, {
            method: 'PATCH',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ uid: uid, restaurantId: restaurantId, id: historyId })
          });
          const responseStatus = results.status;
          setRefreshCount(responseStatus);
          const responseData = await results.json();
          // Handle response data if needed
        } catch (error) {
          console.error('Error undoing save restaurant:', error);
        }
    }

    function calculateTimeDifference(visitDate: moment.MomentInput) {
        const now = moment();
        const visitMoment = moment(visitDate);
        const diffInMinutes = now.diff(visitMoment, "minutes");
        const diffInHours = now.diff(visitMoment, "hours");
        const diffInDays = now.diff(visitMoment, "days");
    
        if (diffInMinutes < 60) {
          return `${diffInMinutes} minutes ago`;
        } else if (diffInHours < 24) {
          return `${diffInHours} hours ago`;
        } else {
          return `${diffInDays} days ago`;
        }
      }

    return (
<>
    {!savedData ? (
      <LoadingAnimation />
    ) : (
      <div className="flex flex-col items-center">
        <div className="card w-full max-h-[500px] xl:max-h-[800] overflow-y-scroll scrollbar-thin">
          <div className="flex flex-col align-center items-center w-full">
            {savedData === "No saved restaurants" && (
              <div className="shadow-xl w-11/12 mx-6 my-2 rounded bg-gradient-to-r from-green-200 from-10% via-green-100 via-30% to-green-100 to-90% text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                <div>No saved restaurants</div>
              </div>
            )}
            {fetchedData && (
              savedData.map((element: any, index: number) => (

                <div className="bg-test flex flex-col items-start shadow-xl w-11/12 mx-6 my-2 rounded bg-gray-100 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl px-2 py-4" key={`a${index}`}>
                  <div className="flex flex-col items-center w-full font-semibold border-b pb-4">{element.name}</div>
                  <div key={`a${index}`} className="md:pl-2">
                    Viewed {calculateTimeDifference(element.date_visited)}
                  </div>
                  <Link key={`d${index}`} href={`/review/?restaurant=${element.restaurant_id_id}`} className="w-full mt-2 bg-jgreen text-jyellow p-2 rounded shadow-lg shadow-xl flex justify-center items-center gap-4">
                    Review
                    <Star />
                  </Link>
                  <div className="flex w-full items-center gap-2">
                    <button
                      onClick={getRestaurantID}
                      a-key={element.restaurant_id_id}
                      b-key={element.id}
                      className="w-full rounded bg-secl text-white px-4 py-2 mt-2"
                    >
                      Remove
                    </button>
                    <div className="flex w-full items-center">
                      <a className='w-full flex items-center justify-center rounded bg-secl text-white px-4 py-2 mt-2' href={`https://www.google.com/maps/place/?q=place_id:${element.googlePlaceId} `} target='_blank'>
                        Go to map
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    )}
  </>)
    }