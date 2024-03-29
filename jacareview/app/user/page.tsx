"use client";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initFirebase } from "@/firebase/firebaseapp";
import { useRouter } from "next/navigation";
import "../globals.css";
import { useEffect, useState } from "react";
import InfoUser from "@/components/userPage/InfoUser";
import RestViewed from "@/components/userPage/RestViewed";
import ClaimButton from "@/components/userPage/ClaimButton";
import NewNav from "@/components/navbarComponents/NewNav";
import LoadingAnimation from "@/components/loading/Loading";

export default function UserPage() {
  const [userDataFetched, setUserDataFetched] = useState<boolean>(false);

  initFirebase();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      return;
    } else {
      router.push("/");
    }
  });

  const [userPhoto, setUserPhoto] = useState<string | undefined>(undefined);
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [birthday, setBirthday] = useState<string | undefined>(undefined);
  const [uid, setUid] = useState<string | null | undefined>(null);
  const [points, setPoints] = useState<string | null | undefined>(null);
  const [triggerRefresh, setTriggerRefresh] = useState<number | null>(null);
  const [historyData, setHistoryData] = useState<any>(null);

  useEffect(() => {
    if (user) {
      setUid(user?.uid);
    }
  }, [user]);

  useEffect(() => {
    if (uid && !userDataFetched) {
      getUserData();
    }
  }, [uid]);

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
        setEmail(data.success.user.email);
        setBirthday(data.success.user.birthday);
        if (data.success.user.username !== null)
          setUserName(data.success.user.username);
        setPoints(data.success.points);
        setHistoryData(data.success.history);
        setTriggerRefresh(data.status);
        setUserDataFetched((prev: boolean) => !prev);
      });
  }

  useEffect(() => {
    if (user) {
      if (user.photoURL) setUserPhoto(user?.photoURL);
      if (user.displayName) setUserName(user?.displayName);
    }
  }, [user]);

  return (
    <>
      <>
        {loading && !user ? (
          <div className="h-screen w-screen flex justify-center items-center">
            <LoadingAnimation />
          </div>
        ) : null}
      </>

      {!loading && user && (
        <div>
          <div className="">
            <NewNav />
          </div>
          <div className="flex flex-col md:flex-row items-center container mx-auto md:shadow-2xl rounded">
            <div className="w-full mb-4">
              <InfoUser
                email={email}
                birthday={birthday}
                name={userName}
                user_uid={uid}
                points={points}
              />
            </div>
            <div className="w-full">
              <RestViewed historyData={historyData} />
            </div>
          </div>
          <div className=" flex flex-col md:flex-row items-center container mx-auto rounded pb-4">
            <ClaimButton user_uid={uid} />
          </div>
        </div>
      )}
    </>
  );
}
