"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initFirebase } from "@/firebase/firebaseapp";
import { useRouter } from "next/navigation";
import ColorChangingButton from "@/components/buttons/ColorChangingButton";
import "../globals.css";
import FunSearchButton from "@/components/loading/funSearchButton/FunSearchButton";
import LoadingAnimation from "@/components/loading/Loading";
import Slideshow from "@/components/SlideShow";
import PriceButton from "@/components/buttons/PriceButton";
import NewNav from "@/components/navbarComponents/NewNav";
import LocationPopup from "@/components/popUpComponents/LocationOnPopUp";
import NoResultsPopup from "@/components/popUpComponents/NoResultsPopUp";
import ModeOfTransportButton from "@/components/buttons/ModeOfTransportButton";
import { Coordinates } from "../../typeInterfaces/globals";
import { GeolibInputCoordinates } from "geolib/es/types";
import Image from "next/image";
import logo from "../../public/logo-home-.png"

interface searchDataObject {
  cuisineOptions: string[] | null;
  price: number | null;
  openNow: boolean | null;
  amountOfOptions: number | null;
  distanceToTravel: number | null;
  location: GeolibInputCoordinates | null;
}

export default function SearchPage() {
  const [location, setLocation] = useState<GeolibInputCoordinates | null>(null);
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
  const [searchClicked, setSearchClicked] = useState<boolean>(false);
  const [turnOnLocation, setTurnOnLocation] = useState<boolean>(false);
  const [modeOfTransport, setModeOfTransport] = useState<string>("Walking");
  const [isThereUser, setIsThereUser] = useState<boolean>(false);

  initFirebase();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      setIsThereUser(false);
    }
    else{
      setIsThereUser(true);
    }
  });

  useEffect(() => {
    if (modeOfTransport === "Walking") {
      setDistanceToTravel(500);
    }
    if (modeOfTransport === "Car") {
      setDistanceToTravel(12500);
    }
  }, [modeOfTransport]);

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
    requestGeolocation();
  }, []);

  const requestGeolocation = async () => {
    if ("geolocation" in navigator) {
      try {
        const position = await new Promise<any>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { coords } = position;
        const { latitude, longitude }: Coordinates = coords;
        setLocation({ latitude, longitude });
      } catch (error) {
        if (error instanceof Error)
          console.error("Error getting geolocation:", error.message);
        // Handle errors
      }
    }
  };

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
        Authorization: `${user?.uid}`,
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
    if (location) {
      fetchRestaurants();
      setSearchClicked((prev: boolean) => !prev);
    }
    if (!location) {
      setTurnOnLocation((prev: boolean) => !prev);
    }
  }

  async function handleSubmitWithLocationOne() {
    searchObject.amountOfOptions = 1;
    if (location) {
      fetchRestaurants();
      setSearchClicked((prev: boolean) => !prev);
    }
    if (!location) {
      setTurnOnLocation((prev: boolean) => !prev);
    }
  }

  const goHome = () => {
    router.push("/");
  }

  return (
    <>
      <div className="h-[calc(100dvh)">
        {turnOnLocation && (
          <LocationPopup setTurnOnLocation={setTurnOnLocation} />
        )}
        {!loading && user ? (
          <div className="">
            <NewNav />
          </div>
        ): <div className="flex w-auto justify-between my-2 mb-4 shadow-lg shadow-indigo-500/40 rounded p-2">
          <Image className="h-16 w-16 text-primary mx-6 cursor-pointer"
                        src={logo.src}
                        alt="Jacareview logo of an alligator with stars in its mouth"
                        width={400}
                        height={400}
                        onClick={goHome}/>
        <button
          className="text-jgreen p-2 px-4 my-4 cursor-pointer font-semibold"
          onClick={goHome}
        >
          Home
        </button>
      </div>}
        <div className="flex flex-col container mx-auto md: mt-0 shadow-2xl bg-test rounded">
          {!resultsFetched && (
            <div className="flex flex-col  gap-4 md:flex-row  flex-grow justify-around items-center rounded ">
              {loading && !user ? (
                <div className="fixed top-0 right-0 left-0 h-screen w-screen flex items-center justify-center bg-white">
                  <LoadingAnimation />
                </div>
              ) : (
                <>
                  {!resultsFetched && !searchClicked ? (
                    <>
                      <div className="sm:mt-0 md:w-1/2  flex flex-col items-center justify-center">
                        <img
                          className="md:rounded-l"
                          src="./gator-searching.png"
                          alt="Gator Searching"
                        />
                      </div>
                      <div className=" p-4 sm:p-0 md:flex flex-col items-center justify-center w-full md:w-1/2">
                        {/* Section 1 */}
                        <div className="flex flex-col items-center justify-center md:pt-4"></div>
                        <h1 className="text-2xl font-bold text-jgreen mb-2border-b flex flex-col items-center justify-center">
                          Search
                        </h1>
                        <div className="flex items-center justify-center ml-4 mr-4 mb-2 space-x-4 md:space-x-8">
                          <FunSearchButton
                            text="One JacaRestaurant"
                            fetchData={handleSubmitWithLocationOne}
                          />
                          <FunSearchButton
                            text="Three JacaRestaurants"
                            fetchData={handleSubmitWithLocation}
                          />
                        </div>
                        {/* Section 2 */}
                        <div className="md:flex flex-col md: justify-center items-center">
                          <div className="flex flex-col items-center justify-center">
                            <h1 className="text-xl font-bold text-jgreen mb-2 border-b">
                              Max Price
                            </h1>
                            <div className="flex flex-row">
                              <PriceButton
                                setPrice={setPrice}
                                price={price}
                                text={"$"}
                              />
                              <PriceButton
                                setPrice={setPrice}
                                price={price}
                                text={"$$"}
                              />
                              <PriceButton
                                setPrice={setPrice}
                                price={price}
                                text={"$$$"}
                              />
                              <PriceButton
                                setPrice={setPrice}
                                price={price}
                                text={"$$$$"}
                              />
                            </div>
                          </div>
                          <div className="flex flex-col items-center justify-center mb-8">
                            {/* Section 3 */}
                            <div className="flex flex-col items-center justify-center mb-0 m-4">
                              <h1 className="text-xl font-bold text-jgreen mb-2 border-b">
                                Dietary Restrictions
                              </h1>
                              <div className="flex flex-row">
                                <ColorChangingButton
                                  text={"Vegan"}
                                  setCuisineType={setCuisineType}
                                  cuisineType={cuisineType}
                                  includeOthers={includeOthers}
                                  count={count}
                                  setCount={setCount}
                                  setIncludeOthers={setIncludeOthers}
                                  resetCount={resetCount}
                                />
                                <ColorChangingButton
                                  text={"Vegetarian"}
                                  setCuisineType={setCuisineType}
                                  cuisineType={cuisineType}
                                  includeOthers={includeOthers}
                                  count={count}
                                  setCount={setCount}
                                  setIncludeOthers={setIncludeOthers}
                                  resetCount={resetCount}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col items-center justify-center mb-8">
                            {/* Section 4 */}
                            <div className="flex flex-col items-center justify-center mb-0 m-4">
                              <h1 className="text-xl font-bold text-jgreen mb-2 border-b">
                                Mode of Transportation
                              </h1>
                              <div className="flex flex-row">
                                <ModeOfTransportButton
                                  setModeOfTransport={setModeOfTransport}
                                  modeOfTransport={modeOfTransport}
                                  text="Walking"
                                />
                                <ModeOfTransportButton
                                  setModeOfTransport={setModeOfTransport}
                                  modeOfTransport={modeOfTransport}
                                  text="Car"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="z-10 fixed top-0 right-0 bottom-0 left-0 bg-white flex justify-center items-center">
                      {!resultsFetched && (
                        <div className=" relative w-80 h-80 md:w-96 md:h-96 lg:w-120 lg:h-120 xl:w-160 xl:h-160 overflow-hidden">
                          <img
                            src="https://media.giphy.com/media/VQUo8CBVIRliuz1TNI/giphy.gif"
                            alt="Alligator eating a star"
                            className="w-full h-full object-cover rounded-full border-4 border-emerald-500"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
          {resultsFetched && results.result.length === 0 ? (
            <NoResultsPopup />
          ) : (
            <div className="flex-grow">
              <Slideshow slides={results} location={location} user={user} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
