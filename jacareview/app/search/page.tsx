"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initFirebase } from "@/firebase/firebaseapp";
import { useRouter } from "next/navigation";
import ColorChangingButton from "@/components/buttons/ColorChangingButton";
import "../globals.css";
import FunSearchButton from "@/components/funSearchButton/FunSearchButton"
import LoadingAnimation from "@/components/loading/Loading";
import VerifyUser from "../globalfunctions/TokenVerification";
import Slideshow from "@/components/SlideShow";
import PriceButton from "@/components/buttons/PriceButton";
import gatorSearching from "./gator-searching.png"
import NewNav from "@/components/NewNav";




export default function SearchPage() {
  const [location, setLocation] = useState<any>(null);
  const [cuisineType, setCuisineType] = useState<string[]>(["restaurant"]);
  const [price, setPrice] = useState<number>(2);
  const [openNow, setOpenNow] = useState<boolean | null>(true);
  const [amountOfOptions, setAmountOfOptions] = useState<number | null>(3);
  const [distanceToTravel, setDistanceToTravel] = useState<number | null>(500);
  const [resultsFetched, setResultsFetched] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [resetCount, setResetCount] = useState<number>(0);
  const [results, setResults] = useState<any>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [statusCodeOK, setStatusCodeOk] = useState<boolean>(false);
  const [includeOthers, setIncludeOthers] = useState<boolean | null>(null);
  const [searchClicked, setSearchClicked] = useState<boolean>(false)

  initFirebase();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      VerifyUser(user.uid, setStatusCode);
    } else {
      router.push("/");
    }
  });

  useEffect(()=>{
    if(statusCode && statusCode !== 200){
      router.push("/")
    }
    else if(statusCode=== 200){
      setStatusCodeOk(true);
    }
  },[statusCode])

  interface searchDataObject {
    cuisineOptions: string[] | null;
    price: number | null;
    openNow: boolean | null;
    amountOfOptions: number | null;
    distanceToTravel: number | null;
    location: { latitude: number; longitude: number };
  }

  const searchObject: searchDataObject = {
    cuisineOptions: cuisineType,
    price: price,
    openNow: openNow,
    amountOfOptions: amountOfOptions,
    distanceToTravel: distanceToTravel,
    location: location,

  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    searchObject.price = price;
  }, [price, cuisineType]);

  useEffect(() => {
      searchObject.cuisineOptions = ["restaurant"];
      searchObject.price = 2;
      searchObject.openNow = true;
      searchObject.amountOfOptions = 3;
      searchObject.distanceToTravel = 500;
  }, [resetCount]);
  
  useEffect(() => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          const { latitude, longitude } = coords;
          setLocation({ latitude, longitude });
        });
      }
    
  }, []);
  


  useEffect(() => {
    if (results) {
      setResultsFetched(true);
    }
  }, [results]);



async function fetchRestaurants() {
    
    const results = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}search/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${user?.uid}`
        },
        body: JSON.stringify(searchObject),
      })
        .then((response) => {
          setStatusCode(response.status);
          return response.json();
        })
        .then((data) => { 
          setResults(data);
        });
}

  async function handleSubmitWithLocation() {
    if(location){
    fetchRestaurants();
    }
    if(!location){
      throw new Error();
    }
    setSearchClicked((prev:boolean) => !prev);
  }

  async function handleSubmitWithLocationOne() {
    searchObject.amountOfOptions = 1;
    if(location){
      fetchRestaurants();
      }
      if(!location){
        throw new Error();
      }
    setSearchClicked((prev:boolean) => !prev);
  }

  
  return (
    <>
    <div className="">
      <NewNav />
    </div><div className="flex flex-col container mx-auto md:mt-10 md:shadow-2xl bg-test rounded">
        {!resultsFetched && (
          <div className="flex flex-col  gap-4 md:flex-row  flex-grow justify-around items-center rounded ">
           
            {!statusCodeOK ? (
             
              <LoadingAnimation />
            ) : (
              <>
                {!resultsFetched && !searchClicked ? (
              
                  <>
                    <div className="sm:mt-0 md:w-1/2  flex flex-col items-center justify-center">
                      <img className="md:rounded-l" src="./gator-searching.png" alt="Gator Searching" />
                    </div>
                    <div className=" p-4 sm:p-0 mb-4 md:flex flex-col items-center justify-center w-full md:w-1/2">
                      {/* Section 1 */}
                      <div className="flex flex-col items-center justify-center"></div>
                      <h1 className="text-2xl font-bold text-jgreen mb-2 border-b flex flex-col items-center justify-center">Search</h1>
                      <div className="flex items-center justify-center mb-8 space-x-4 md:space-x-8">
                        <FunSearchButton text="One jacaRestaurant" fetchData={handleSubmitWithLocationOne} />
                        <FunSearchButton text="Three jacaRestaurants" fetchData={handleSubmitWithLocation} />
                      </div>
                      {/* Section 2 */}
                      <div className="md:flex md:items-baseline md:align-center">
                      <div className="flex flex-col items-center justify-center">
                        <h1 className="text-xl font-bold text-jgreen mb-2 border-b">Max Price</h1>
                        <div className="flex flex-row">
                          <PriceButton setPrice={setPrice} price={price} text={"$"}  />
                          <PriceButton setPrice={setPrice} price={price} text={"$$"} />
                          <PriceButton setPrice={setPrice} price={price} text={"$$$"} />
                          <PriceButton setPrice={setPrice} price={price} text={"$$$$"} />
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center mb-8">
                        {/* Section 3 */}
                        <div className="flex flex-col items-center justify-center mb-0 m-4">
                          <h1 className="text-xl font-bold text-jgreen mb-2 border-b">Dietary Restrictions</h1>
                          <div className="flex flex-row">
                            <ColorChangingButton text={"Vegan"}
                              setCuisineType={setCuisineType}
                              cuisineType={cuisineType}

                              includeOthers={includeOthers}

                              count={count}
                              setCount={setCount}
                              setIncludeOthers={setIncludeOthers}
                              resetCount={resetCount} />
                            <ColorChangingButton text={"Vegetarian"}
                              setCuisineType={setCuisineType}
                              cuisineType={cuisineType}
                              includeOthers={includeOthers}
                              count={count}
                              setCount={setCount}
                              setIncludeOthers={setIncludeOthers}
                              resetCount={resetCount} />
                          </div>
                        </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (

                  <div className="flex items-center justify-center h-screen">
                    {!resultsFetched && (
                      <div className=" relative w-80 h-80 md:w-96 md:h-96 lg:w-120 lg:h-120 xl:w-160 xl:h-160 overflow-hidden">
                        <img
                          src="https://media.giphy.com/media/VQUo8CBVIRliuz1TNI/giphy.gif"
                          alt="Alligator eating a star"
                          className="w-full h-full object-cover rounded-full border-4 border-emerald-500" />
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        )}
        {resultsFetched && (
          <div className="flex-grow">
           
            <Slideshow slides={results} location={location} user={user} />
          </div>
        )}
      </div>
      </>
  
);
      }  