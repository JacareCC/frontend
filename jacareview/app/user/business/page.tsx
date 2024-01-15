"use client";
import { useState, useEffect, MouseEvent } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initFirebase } from "@/firebase/firebaseapp";
import { useRouter } from "next/navigation";
import "../../../app/globals.css";
import FetchBusinesses from "@/app/globalfunctions/FetchBusinesses";
import VerifyUser from "@/app/globalfunctions/TokenVerification";
import BusinessNavBar from "@/components/navbarComponents/BusinessNavBar";
import "../../../app/globals.css";
import NewNav from "@/components/navbarComponents/NewNav";
import LoadingAnimation from "@/components/loading/Loading";

const BusinessPage: React.FC = () => {
  const [businessList, setBusinessList] = useState<any>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [uid, setUid] = useState<string>("");

  initFirebase();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      VerifyUser(user.uid, setStatusCode);
      setUid(user.uid);
    } else {
      router.push("/");
    }
  });

  useEffect(() => {
    if (statusCode && statusCode !== 200) {
      router.push("/");
    }
  }, [statusCode]);

  useEffect(() => {
    if (user) {
      FetchBusinesses(user.uid, setBusinessList);
    }
  }, [user]);

  useEffect(() => {}, [businessList]);

  return (
    <>
      {!statusCode ? (
        <div className="h-screen w-screen flex justify-center items-center">
          <LoadingAnimation />
        </div>
      ) : null}
      {statusCode && statusCode === 200 && (
        <div>
          <NewNav />
          <div className="flex flex-col md:flex-row items-center container mx-auto md:shadow-2xl md:rounded bg-test">
            <div className="flex items-center justify-center">
              <img
                className="md:rounded-l"
                src="../../../jake.png"
                alt="Business Gator"
              />
            </div>
            <div className="w-full md:max-h-sm">
              <BusinessNavBar />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BusinessPage;
