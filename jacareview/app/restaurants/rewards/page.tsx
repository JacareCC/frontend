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
import NewNav from "@/components/NewNav";
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

  return (
    <div>
      <div className="">
        <NewNav />
      </div>
      <div className="flex flex-col container mx-auto md:mt-10 md:shadow-2xl bg-test rounded">
        <div className="flex flex-col  gap-4 md:flex-row  flex-grow justify-around items-center rounded ">
          {isLoading ? (
            <LoadingAnimation />
          ) : (
            <>
              <h1>{business?.name}</h1>
              <p>Your Jacoins: {points}</p>
              <ul>
                {business?.rewards.map((reward) => {
                  return (
                    <li>
                      <p>
                        {reward.reward_level}: {reward.reward_description},
                        Jacoins:
                        {reward.points_required}
                      </p>
                      <button onClick={() => handleBuy(reward.id)}>Buy</button>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantRewardsPage;
