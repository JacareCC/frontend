"use client";
import { useSearchParams } from "next/navigation";
import { FC } from "react";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initFirebase } from "@/firebase/firebaseapp";
import { useRouter } from "next/navigation";
import VerifyUser from "@/app/globalfunctions/TokenVerification";
import "../../../app/globals.css";
import NewNav from "@/components/navbarComponents/NewNav";
import LoadingAnimation from "@/components/loading/Loading";

interface RestaurantRewardsPageProps {}

interface Business {
  name: string;
  place_id: string;
  rewards: Array<{
    id: number;
    restaurant_id_id: number;
    reward_level: string;
    reward_description: string;
    points_required: number;
  }>;
}

const RestaurantRewardsPage: FC<RestaurantRewardsPageProps> = () => {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [statusCodeOK, setStatusCodeOk] = useState<boolean>(false);
  const [uid, setUid] = useState<string | null | undefined>(null);
  const [points, setPoints] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [business, setBusiness] = useState<Business | null>(null);
  const [userData, setUserData] = useState<any>(null)
  const id = searchParams.get("id");

  initFirebase();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      VerifyUser(user.uid, setStatusCode);
    } else {
      router.push("/");
    }
  });

  useEffect(() => {
    if (statusCode && statusCode !== 200) {
      router.push("/");
    } else if (statusCode === 200) {
      setStatusCodeOk(true);
    }
  }, [statusCode]);

  useEffect(() => {
    if (user) {
      setUid(user?.uid);
    }
  }, [user]);

  useEffect(() => {
    if (uid) {
      getUserData();
      getBusinessData();
    }
    setIsLoading(false);
  }, [uid]);

  useEffect(() => {
    console.log(business)
    console.log(userData)
  },[business, userData])

  async function getBusinessData() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}business/profile/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `${uid}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setBusiness(data.success));
  }

  async function getUserData() {
    const results = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}user/profile/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${uid}`,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPoints(data.success.points);
        setUserData(data.success);
      });
  }

  async function handleBuy(tierId: number) {
    const results = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}tier/purchase/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tierId: tierId,
          restaurantId: id,
          uid: uid,
        }),
      }
    ).then((res) => res.json());
  }

  const getRewardClass = (rewardLevel: string): string => {
    switch (rewardLevel.toLowerCase()) {
      case 'gold':
        return 'bg-gold';
      case 'silver':
        return 'bg-silver';
      case 'bronze':
        return 'bg-bronze';
      default:
        return 'bg-test';
    }
  };

  return (
    <div>
      <div className="">
        <NewNav />
      </div>
      <div className="flex flex-col container mx-auto md:shadow-2xl md:mt-10 bg-test rounded">
        <div className="flex flex-col md:flex-row flex-grow items-center rounded">
          <div className="sm:mt-0 md:w-1/2">
            <img className="md:rounded-l w-full h-full" src='../jaca-date.png' alt="Gator Searching" />
          </div>
          <div className="flex flex-col justify-around items-center w-full gap-4 h-full my-4">
            <p className="flex justify-center font-semibold bg-test">Your Jacoins: {points}</p>
            {isLoading ? (
              <div className="fixed h-screen w-screen flex justify-center items-center top-0 left-0 right-0 bg-white">
                {/* Loading Animation component goes here */}
                {/* Replace the following line with your LoadingAnimation component */}
                <div>Loading Animation...</div>
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center gap-4 w-full h-full">
                  <h1><strong>{business?.name}</strong></h1>
                  <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded w-full md:w-auto">
                    {/* Render rewards based on reward_level */}
                    <div className="p-4 rounded font-semibold bg-bronze">
                      <h2 className="text-center text-xl border-b mb-1">BRONZE</h2>
                      {business?.rewards
                        .filter((reward) => reward.reward_level === "bronze")
                        .map((reward, index) => (
                          <div key={`c${index}`}>
                            <p className="text-left py-2">{reward.reward_description}</p>
                            <p className="text-left">Jacoins: {reward.points_required}</p>
                            <button
                              className="bg-jgreen text-jyellow mt-2 p-2 rounded shadow-lg shadow-xl flex justify-center items-center gap-4 w-full"
                              onClick={() => handleBuy(reward.id)}
                              key={`b${index}`}
                            >
                              Buy
                            </button>
                          </div>
                        ))}
                    </div>

                    <div className="p-4 rounded font-semibold bg-silver">
                      <h2 className="text-center text-xl border-b mb-1">SILVER</h2>
                      {business?.rewards
                        .filter((reward) => reward.reward_level === "silver")
                        .map((reward, index) => (
                          <div key={`c${index}`}>
                            <p className="text-left py-2">{reward.reward_description}</p>
                            <p className="text-left">Jacoins: {reward.points_required}</p>
                            <button
                              className="bg-jgreen text-jyellow mt-2 p-2 rounded shadow-lg shadow-xl flex justify-center items-center gap-4 w-full"
                              onClick={() => handleBuy(reward.id)}
                              key={`b${index}`}
                            >
                              Buy
                            </button>
                          </div>
                        ))}
                    </div>

                    <div className="p-4 rounded font-semibold bg-gold">
                      <h2 className="text-center text-xl border-b mb-1">GOLD</h2>
                      {business?.rewards
                        .filter((reward) => reward.reward_level === "gold")
                        .map((reward, index) => (
                          <div key={`c${index}`}>
                            <p className="text-left py-2">{reward.reward_description}</p>
                            <p className="text-left">Jacoins: {reward.points_required}</p>
                            <button
                              className="bg-jgreen text-jyellow mt-2 p-2 rounded shadow-lg shadow-xl flex justify-center items-center gap-4 w-full"
                              onClick={() => handleBuy(reward.id)}
                              key={`b${index}`}
                            >
                              Buy
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default RestaurantRewardsPage;
