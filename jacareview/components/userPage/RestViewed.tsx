import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initFirebase } from "@/firebase/firebaseapp";
import moment from "moment";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

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
        console.log(data.success.history);
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
    if (Array.isArray(historyData)) {
      let filteredHistory = myArr.filter((obj: any, pos: any, arr: any) => {
        return arr.map((mapObj: any) => mapObj[key]).indexOf(obj[key]) === pos;
      });

      setHistoryDataFiltered(filteredHistory);
    }
  }

  function toProfilePage() {
    router.push("/userpage");
  }
  return (
    <div className="shadow-2xl m-2 rounded bg-gradient-to-r from-indigo-100 from-10% via-sky-100 via-30% to-emerald-100 to-90% text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
      {!historyData ? (
        <div>Loading ...</div>
      ) : (
        <div>
          {historyData.length === 0 ? (
            <div>No Restaurants Visited</div>
          ) : (
            <div className="card max-h-[400px] overflow-y-auto">
              {historyDataFiltered &&
                historyDataFiltered.slice(0, 4).map((element: any, index: number) => (
                    <div className="flex flex-col border-b mb-2 p-2" >
                        <div key={`b${index}`} className="restaurant-card ">
                        <div key={`c${index}`} className="font-bold">Restaurant: {element.name || 'no name'} </div>
                    <div key={`a${index}`}>Date Visited: {moment(element.date_visited).format("MM/DD/YYYY")}</div>
                    <Link href={`/reviewpage/?restaurant=${element.restaurant_id_id}`} className="text-blue-500 hover:underline cursor-pointer">
                      Review
                    </Link>
                    {!element.saved ? (
                        <button onClick={getRestaurantID} a-key={element.restaurant_id_id} b-key={element.id} className="bg-blue-500 text-white px-4 py-2 mt-2">
                        Save
                      </button>
                    ) : (
                        <button onClick={getRestaurantID} a-key={element.restaurant_id_id} b-key={element.id} className="bg-red-500 text-white px-4 py-2 mt-2">
                        Unsave
                      </button>
                    )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}