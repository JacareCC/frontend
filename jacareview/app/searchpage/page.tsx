"use client";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { initFirebase } from "@/firebase/firebaseapp";
import { useRouter } from "next/navigation";
import ResultList from "@/components/ResultList";
import ColorChangingButton from "@/components/ColorChangingButton";
import "../globals.css";
import Navbar from "@/components/Navbar";
import FunSearchButton from "@/components/funSearchButton/FunSearchButton"
import LoadingAnimation from "@/components/loading/Loading";

export default function SearchPage() {
  const [location, setLocation] = useState<any>(null);
  const [cuisineType, setCuisineType] = useState<string[]>(["restaurant"]);
  const [price, setPrice] = useState<number | null>(2);
  const [openNow, setOpenNow] = useState<boolean | null>(true);
  const [amountOfOptions, setAmountOfOptions] = useState<number | null>(3);
  const [distanceToTravel, setDistanceToTravel] = useState<number | null>(500);
  const [resultsFetched, setResultsFetched] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [resetCount, setResetCount] = useState<number>(0);
  const [results, setResults] = useState<any>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [includeOthers, setIncludeOthers] = useState<boolean | null>(null);
  const [searchClicked, setSearchClicked] = useState<boolean>(false)

  initFirebase();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
    } else {
      router.push("/");
    }
  });

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
    // Scroll to the top of the page on component mount (refresh)
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    // if (
    //   cuisineType.length > 0 &&
    //   price &&
    //   openNow !== null &&
    //   amountOfOptions &&
    //   distanceToTravel
    // ) {
      if ("geolocation" in navigator) {
        // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          const { latitude, longitude } = coords;
          setLocation({ latitude, longitude });
        });
      }
    // }
  }, []);
  

//   cuisineType, price, openNow, amountOfOptions, distanceToTravel
//   useEffect(() => {
//     // if (location && cuisineType.length > 0) {
//     //   setSearchAvailable(true);
//     // } else {
//     //   setSearchAvailable(false);
//     // }
//   }, [location, cuisineType]);

useEffect(() => {
    if (results) {
      setResultsFetched(true);
    }
  }, [location]);

  useEffect(() => {
    if (results) {
      setResultsFetched(true);
    }
  }, [results]);

  



//   //handlers for Change
  

//   function handleCuisineAdd(event: any) {
//     let cuisineTypeAdded: string = event.target.innerText;
//     let cuisineToSend: string = "";
    // if (!cuisineTypeList.includes(event.target.value)) {
    //   setCuisineTypeList((oldArray) => [...oldArray, event.target.value]);
    // }
    
//     if (cuisineTypeAdded === 'Vegan' || cuisineTypeAdded === "Vegetarian"){
//         if(!cuisineType.includes(cuisineTypeAdded)){
//         setCuisineType(["vegan_restaurant"])
//         }
//         if(cuisineTypeAdded === 'Vegetarian' && cuisineType.includes("vegan_restaurant")){
//             setCuisineType((oldArray) => [...oldArray, "vegetarian_restaurant"]);
//         }
//         else{
//         setCuisineType(["vegetarian_restaurant"]);
//         }
//     }

//     if(includeOthers){
//     if (cuisineTypeAdded === "Ice Cream") {
//       cuisineToSend = "ice_cream_shop";
//     }
//     if (cuisineTypeAdded === "Any") {
//       cuisineToSend = "restaurant";
//     }
//     if (cuisineTypeAdded === "Fast Food") {
//       cuisineToSend = "fast_food_restaurant";
//     }
//     if (cuisineTypeAdded === "Sandwich Shop") {
//       cuisineToSend = "sandwich_shop";
//     }
//     if (cuisineTypeAdded === "Steak House") {
//       cuisineToSend = "steak_house";
//     }
//     if (
//       cuisineTypeAdded === "Bar" ||
//       event.target.value === "Cafe" ||
//       event.target.value === "Bakery"
//     ) {
//       cuisineToSend = cuisineTypeAdded.toLowerCase();
//     } else if (cuisineToSend === "") {
//       cuisineToSend = cuisineTypeAdded.toLowerCase() + "_restaurant";
//     }

//     if (!cuisineType.includes(cuisineToSend))
//       setCuisineType((oldArray) => [...oldArray, cuisineToSend]);
// }
//   }

//   function handleCuisineRemoval(event: any) {
//     let indexString: string = event.target.getAttribute("a-key");
//     let indexNumber: number = parseInt(indexString);
//     const newCuisineTypeList: string[] = [...cuisineTypeList];
//     newCuisineTypeList.splice(indexNumber, 1);
//     setCuisineTypeList(newCuisineTypeList);
//     const newCuisineTypeArray: string[] = [...cuisineType];
//     newCuisineTypeArray.splice(indexNumber, 1);
//     setCuisineType(newCuisineTypeArray);
//   }

//   function handleDistanceToTravel(event: any) {
//     let stringDistance = event.target.innerText;
//     let splitStringDistance = stringDistance.split("k")[0];
//     let parsedStringDistanceToKM = parseInt(splitStringDistance) * 1000;
//     setDistanceToTravel(parsedStringDistanceToKM);
//   }

//   function handlePrice(event: any) {
//     let priceString = event.target.value;
//     let priceNumber = priceString.length;
//     setPrice(priceNumber);
//   }

//   function handleOpen(event: any) {
//     if (event.target.value === "Yes") {
//       setOpenNow(true);
//     } else if (event.target.value === "No") {
//       setOpenNow(false);
//     }
//   }

//   function handleAmountOfOptions(event: any) {
//     const numberOfResults = parseInt(event.target.value);
//     setAmountOfOptions(numberOfResults);
//   }
async function fetchRestaurants() {
    
    const results = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}search/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchObject),
      })
        .then((response) => {
          setStatusCode(response.status);
          return response.json();
        })
        .then((data) => { console.log(data);
          setResults(data);
        });
}

  async function handleSubmitWithLocation() {
    fetchRestaurants();
    setSearchClicked((prev:boolean) => !prev);
  }

  async function handleSubmitWithLocationOne() {
    searchObject.amountOfOptions = 1;
    fetchRestaurants();
    setSearchClicked((prev:boolean) => !prev);
  }

  
  return (
    <div>
      <Navbar /> {/* Sticky Navbar */}
      <div className="mt-16"> {/* Container div for content, adjusted for NavBar height */}
        {!user ? (
          // Loading Animation when user is not available
          <LoadingAnimation />
        ) : (
          <>
            {!resultsFetched && !searchClicked ? (
              // Your existing sections
              <>
                <div className="min-h-screen bg-white font-yaro text-emerald-500 p-4 sm:p-8 lg:p-16">
                  {/* Section 1 */}
                  <div className="flex items-center justify-center mb-8 space-x-4 md:space-x-8">
                    <FunSearchButton text="JacarExplore 1" fetchData={handleSubmitWithLocationOne} />
                    <FunSearchButton text="JacarExplore 3" fetchData={handleSubmitWithLocation} />
                  </div>

                  {/* Section 2 */}
                  <div className="flex flex-col items-center justify-center mb-8">
                    <h1 className="text-4xl font-bold mb-6">Dietary Restrictions</h1>
                    <ColorChangingButton resetCount={resetCount} setCount={setCount} count={count} setCuisineType={setCuisineType} cuisineType={cuisineType} setIncludeOthers={setIncludeOthers} includeOthers={includeOthers} text="Include Other Cuisines" />
                    <ColorChangingButton resetCount={resetCount} setCount={setCount} count={count} setCuisineType={setCuisineType} cuisineType={cuisineType} setIncludeOthers={setIncludeOthers} includeOthers={includeOthers} text="Vegan" />
                    <ColorChangingButton resetCount={resetCount} setCount={setCount} count={count} setCuisineType={setCuisineType} cuisineType={cuisineType} setIncludeOthers={setIncludeOthers} includeOthers={includeOthers} text="Vegetarian" />
                  </div>

                  {/* Section 3 */}
                  <div className="flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold mb-6">Distance</h1>
                    {/* Add your distance buttons here */}
                  </div>
                </div>
              </>
            ) : (
              // Render results or loading animation based on conditions
              <>
                {resultsFetched ? (
                  <ResultList results={results} location={location} />
                ) : (
                  <div className="flex items-center justify-center h-screen">
                    <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-120 lg:h-120 xl:w-160 xl:h-160 overflow-hidden">
                      <img
                        src="https://media.giphy.com/media/VQUo8CBVIRliuz1TNI/giphy.gif"
                        alt="Alligator eating a star"
                        className="w-full h-full object-cover rounded-full border-4 border-emerald-500"
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

