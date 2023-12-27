import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initFirebase } from "@/firebase/firebaseapp";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookmarkIcon, Star } from "lucide-react";
import LoadingAnimation from "../loading/Loading";
import { AnyARecord } from "dns";
import { test } from "mocha";

export default function RestViewed() {
  const [historyData, setHistoryData] = useState<any>(null);
  const [historyDataFiltered, setHistoryDataFiltered] = useState<any>(null);
  const [uid, setUid] = useState<string | null | undefined>(null);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [historyId, setHistoryId] = useState<number | null>(null);
  const [triggerRefresh, setTriggerRefresh] = useState<number | null>(null);

  initFirebase();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setUid(user?.uid);
    }
  }, [user]);

  useEffect(() => {
    if (uid) {
      getHistoryData();
    }
  }, [uid]);

  useEffect(() => {
    if (historyData) {
      filterToUniqueRestaurants(historyData, "restaurant_id_id");
    }
  }, [historyData]);

  useEffect(() => {
    if (restaurantId && historyId) {
      changeSaveRestaurant();
    }
  }, [restaurantId]);

  useEffect(() => {
    if (triggerRefresh === 200) {
      window.location.reload();
    }
  }, [triggerRefresh]);
  
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

  // helper
  async function getHistoryData() {
    const results = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/profile/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${uid}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setHistoryData(data.success.history);
        setTriggerRefresh(data.status);
      });
  }

  function getRestaurantID(event: any) {
    const restaurantIdString: string = event.target.getAttribute("a-key");
    const historyIdNumber: number = event.target.getAttribute("b-key");
    setRestaurantId(restaurantIdString);
    setHistoryId(historyIdNumber);
  }

  async function changeSaveRestaurant() {
    const results = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/favorites/add/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid: uid, restaurantId: restaurantId, id: historyId }),
    }).then((response) => {
      setTriggerRefresh(response.status);
      return response.json();
    });
  }

  function filterToUniqueRestaurants(myArr: any, key: string) {
    if (Array.isArray(myArr)) {
      let arrayWithSaves = myArr.filter((element:any) => element.saved === true);
      let newArrayWithSaves = myArr.filter((element:any) => {
        return arrayWithSaves.find(uniqueRestaurant => uniqueRestaurant.restaurant_id_id == element.restaurant_id_id) == undefined
    })  

      let newArrayToFilter = arrayWithSaves.concat(newArrayWithSaves);
      let testFilteredHistory = newArrayToFilter.filter((obj: any, pos: any, arr: any) => {
        return arr.map((mapObj: any) => mapObj[key]).indexOf(obj[key]) === pos;
      });
      
      const sortedByDate = testFilteredHistory.sort((a, b) => {
        const dateA = new Date(a.date_visited);
        const dateB = new Date(b.date_visited);
        return dateB.getTime() - dateA.getTime();
      });
      setHistoryDataFiltered(sortedByDate);
      }
      else{
        throw new Error();
      }

    }
  

  return (
    <div className="flex flex-col align-center items-center bg-test pb-4">
    <h1 className="pt-2 text-l font-semibold text-xl my-2" >Viewed Restaurants</h1>
    <div className=" shadow-xl w-11/12 mx-6  rounded bg-gray-100 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
      {!historyData ? (
        <div className="fixed right-0 top-0 left-0 h-screen w-screen bg-white flex items-center justify-center">
          <LoadingAnimation />
        </div>
          ) : (
              <div>
          {historyData.length === 0 ? (
              <div>No Restaurants Visited</div>
              ) : (
              <div className="card w-full max-h-[400px] md:max-h-[600px] overflow-y-scroll scrollbar-thin px-4 py-2">
              {historyDataFiltered &&
                historyDataFiltered.map((element: any, index: number) => (
                    <div key={`z${index}`} className="flex flex-col border-b mb-2 p-4 bg-test">
                        <div key={`b${index}`} className="">
                        <div key={`c${index}`} className="mb-1 border-b text-center pb-2">{element.name || 'no name'} </div>
                        <div key={`a${index}`} className="mb-2">
                          Viewed {calculateTimeDifference(element.date_visited)}
                    </div>
                    <div className="flex flex-col gap-4">
                    <Link key={`d${index}`} href={`/review/?restaurant=${element.restaurant_id_id}`} className="bg-jgreen  text-jyellow p-2 rounded shadow-lg shadow-xl flex justify-center items-center gap-4" >
                    <Star className="text-jgreen"/>
                      Review
                      <Star/>
                    </Link>
                    {!element.saved ? (
                        <button key={`e${index}`} onClick={getRestaurantID} a-key={element.restaurant_id_id} b-key={element.id} className="flex gap-4 bg-lgreen  text-white p-2 rounded shadow-lg shadow-xl flex justify-center items-center">
                        <BookmarkIcon className="text-lgreen"/>
                        Save
                        <BookmarkIcon/>
                      </button>
                    ) : (
                        <button key={`f${index}`} onClick={getRestaurantID} a-key={element.restaurant_id_id} b-key={element.id} className=" bg-lgreen  text-white p-2 rounded shadow-lg shadow-xl flex justify-center items-center">
                        Remove
                      </button>
                    )}
                    </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
      </div>
  );
}
