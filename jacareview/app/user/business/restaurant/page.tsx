"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initFirebase } from "@/firebase/firebaseapp";
import BusinessEditForm from "@/components/formComponents/BusinessEditForm";
import OnlyOneOkButtonTier from "@/components/buttons/onlyOneOkButton/OnlyOneOkButtonTier";
import "../../../../app/globals.css";
import EditOneOkButtonTier from "@/components/buttons/onlyOneOkButton/EditOneOkTierButton";
import FetchBusinesses from "@/app/globalfunctions/FetchBusinesses";
import NewNav from "@/components/NewNav";
import ReviewListBusiness from "@/components/ReviewListBusiness";
import { ArrowBigLeft, BackpackIcon } from "lucide-react";

const BusinessPageWithId: React.FC = () => {
  const [statusCode, setStatusCode] = useState<number | null>(0);
  const [pageData, setPageData] = useState<any>(null);
  const [parsedId, setParsedId] = useState<any>(null);
  const [parsedPageData, setParsedPageData] = useState<any>(null);
  const [bronzeExists, setBronzeExists] = useState<any>(null);
  const [silverExists, setSilverExists] = useState<any>(null);
  const [goldExists, setGoldExists] = useState<any>(null);
  const [reviewsToSend, setReviewsToSend] = useState<any>(null);
  const [isQrActive, setIsQrActive] = useState<boolean>(false);
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  initFirebase();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (id && user) {
      FetchBusinesses(user.uid, setPageData);
      const parse = JSON.parse(id);
      setParsedId(parse);
    }
  }, [id, user]);

  const handleQRClick = () => {
    setIsQrActive(true);
  };

  const handleCloseQR = () => {
    setIsQrActive(false);
  };

  useEffect(() => {
    if (pageData) {
      const filteredData = pageData.filter(
        (element: any) => element.id === parsedId
      );
      setParsedPageData(filteredData);
    }
  }, [pageData]);
  console.log(parsedPageData);
  useEffect(() => {
    if (parsedPageData && Array.isArray(parsedPageData[0].rewards)) {
      setReviewsToSend(parsedPageData[0].reviews);

      parsedPageData[0].rewards.forEach((element: { reward_level: string }) => {
        if (element.reward_level === "bronze") {
          setBronzeExists(element);
        } else if (element.reward_level === "silver") {
          setSilverExists(element);
        } else if (element.reward_level === "gold") {
          setGoldExists(element);
        }
      });
    }
  }, [parsedPageData]);

  useEffect(() => {
    if (statusCode === 201) {
      window.location.reload();
    }
  }, [statusCode]);

  function handleClose() {
    router.push("/user/business");
  }

  return (
    <div className="">
      <NewNav />
      <div className="max-w-screen-md mx-auto flex flex-col ">
        {parsedPageData && (
          <>
            <div className="">
              <h1 className="pb-4 w-full  flex justify-center text-xl font-semibold">
                {parsedPageData[0].business_name}
              </h1>
            </div>
            <div className="w-full flex justify-center">
              <div className="flex flex-col items-center">
                <img
                  src={parsedPageData[0].qr_code_link}
                  alt="QR Code"
                  className="cursor-pointer"
                  onClick={handleQRClick}
                />
                <p
                  className="text-blue-500 cursor-pointer"
                  onClick={handleQRClick}
                >
                  Click to enlarge
                </p>
                <a
                  className="text-blue-500 cursor-pointer"
                  href={`${parsedPageData[0].qr_code_link}`}
                  target="_blank"
                >
                  Click for direct link
                </a>
              </div>
            </div>
            <div className="">
              {isQrActive && (
                <div className="modal fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50">
                  <div className="modal-content bg-white p-8 mx-auto mt-20 max-w-2xl rounded-lg">
                    <span
                      onClick={handleCloseQR}
                      className="close absolute top-0 right-0 p-4 cursor-pointer"
                    >
                      &times;
                    </span>
                    <img
                      src={parsedPageData[0].qr_code_link}
                      alt="QR Code"
                      className="mx-auto"
                      style={{ width: "100%", height: "auto" }}
                    />
                    <button
                      className="flex justify-center w-full"
                      onClick={handleCloseQR}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="">
              <div className="rounded border-xl m-2 shadow-xl flex flex-col gap-2 p-2">
                <h1 className="flex flex-col items-center font-semibold text-xl">
                  Rewards Tiers
                </h1>
                <div className="flex flex-row sm:flex-row items-center justify-center">
                  {bronzeExists ? (
                    <EditOneOkButtonTier
                      refresh={bronzeExists.refreshes_in}
                      backgroundColor={"bronze"}
                      text={"Bronze"}
                      points={bronzeExists.points_required}
                      tierId={bronzeExists.id}
                      description={bronzeExists.reward_description}
                    />
                  ) : (
                    <OnlyOneOkButtonTier
                      id={parsedPageData[0]?.owner_user_id_id}
                      restaurant_id={parsedPageData[0]?.id}
                      backgroundColor={"bronze"}
                      text={"Bronze"}
                      setStatusCode={setStatusCode}
                    />
                  )}
                  {silverExists ? (
                    <EditOneOkButtonTier
                      refresh={silverExists.refreshes_in}
                      backgroundColor={"silver"}
                      text={"Silver"}
                      points={silverExists.points_required}
                      tierId={silverExists.id}
                      description={silverExists.reward_description}
                    />
                  ) : (
                    <OnlyOneOkButtonTier
                      id={parsedPageData[0]?.owner_user_id_id}
                      restaurant_id={parsedPageData[0]?.id}
                      backgroundColor={"silver"}
                      text={"Silver"}
                      setStatusCode={setStatusCode}
                    />
                  )}
                  {goldExists ? (
                    <EditOneOkButtonTier
                      refresh={goldExists.refreshes_in}
                      backgroundColor={"gold"}
                      text={"Gold"}
                      points={goldExists.points_required}
                      tierId={goldExists.id}
                      description={goldExists.reward_description}
                    />
                  ) : (
                    <OnlyOneOkButtonTier
                      backgroundColor={"gold"}
                      id={parsedPageData[0]?.owner_user_id_id}
                      restaurant_id={parsedPageData[0]?.id}
                      text={"Gold"}
                      setStatusCode={setStatusCode}
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <BusinessEditForm
                    email={parsedPageData[0]?.email}
                    contactPerson={parsedPageData[0]?.contact_person}
                    phoneNumber={parsedPageData[0].phone_number}
                    user_uid={user?.uid}
                  />
                </div>
                <div className="w-auto md:w-1/2 md:mr-2">
                  <ReviewListBusiness reviews={parsedPageData[0].reviews} />
                </div>
              </div>
              <div className="flex justify-star items-center mt-2"></div>
              <button
                key={"CloseButton"}
                onClick={handleClose}
                className="mb-2 ml-2 w-1/4 md:w-1/2 md:w-2/12 bg-gray-400  p-2 rounded shadow-lg shadow-xl text-white flex gap-4"
              >
                <ArrowBigLeft />
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BusinessPageWithId;
