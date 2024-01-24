"use client";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { initFirebase } from "@/firebase/firebaseapp";
import { useRouter, useSearchParams } from "next/navigation";
import "../globals.css";
import ReviewForm from "@/components/formComponents/ReviewForm";
import NewNav from "@/components/navbarComponents/NewNav";

export default function ReviewPage() {
  initFirebase();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [uid, setUid] = useState<string | null | undefined>(null);
  const [restaurantPlaceId, setRestarantPlaceId] = useState<string | null>(
    null
  );

  const restaurantName = "aaa"; //need to pass the restaurant's name
  const params = useSearchParams();
  const restaurant = params.get("restaurant");
  const router = useRouter();

  useEffect(() => {
    setRestarantPlaceId(restaurant);
  }, []);

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      router.push("/");
    } else {
      setUid(user.uid);
    }
  });

  return (
    <>
      <div className="">
        <NewNav />
        <ReviewForm
          userUid={String(uid)}
          restaurantPlaceId={String(restaurantPlaceId)}
          restaurantName={String(restaurantName)}
        />
      </div>
    </>
  );
}
