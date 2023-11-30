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
  const [results, setResults] = useState<any>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [includeOthers, setIncludeOthers] = useState<boolean | null>(null);

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

  useEffect(() => {
    console.log(cuisineType)
    console.log(count)
    console.log(includeOthers)
  }, [cuisineType, count]);



//   //handlers for Change
  

  function handleCuisineAdd(event: any) {
    let cuisineTypeAdded: string = event.target.innerText;
    let cuisineToSend: string = "";
    // if (!cuisineTypeList.includes(event.target.value)) {
    //   setCuisineTypeList((oldArray) => [...oldArray, event.target.value]);
    // }
    
    if (cuisineTypeAdded === 'Vegan' || cuisineTypeAdded === "Vegetarian"){
        if(!cuisineType.includes(cuisineTypeAdded)){
        setCuisineType(["vegan_restaurant"])
        }
        if(cuisineTypeAdded === 'Vegetarian' && cuisineType.includes("vegan_restaurant")){
            setCuisineType((oldArray) => [...oldArray, "vegetarian_restaurant"]);
        }
        else{
        setCuisineType(["vegetarian_restaurant"]);
        }
    }

    if(includeOthers){
    if (cuisineTypeAdded === "Ice Cream") {
      cuisineToSend = "ice_cream_shop";
    }
    if (cuisineTypeAdded === "Any") {
      cuisineToSend = "restaurant";
    }
    if (cuisineTypeAdded === "Fast Food") {
      cuisineToSend = "fast_food_restaurant";
    }
    if (cuisineTypeAdded === "Sandwich Shop") {
      cuisineToSend = "sandwich_shop";
    }
    if (cuisineTypeAdded === "Steak House") {
      cuisineToSend = "steak_house";
    }
    if (
      cuisineTypeAdded === "Bar" ||
      event.target.value === "Cafe" ||
      event.target.value === "Bakery"
    ) {
      cuisineToSend = cuisineTypeAdded.toLowerCase();
    } else if (cuisineToSend === "") {
      cuisineToSend = cuisineTypeAdded.toLowerCase() + "_restaurant";
    }

    if (!cuisineType.includes(cuisineToSend))
      setCuisineType((oldArray) => [...oldArray, cuisineToSend]);
}
  }

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
        .then((data) => {
          setResults(data);
        });
}

  async function handleSubmitWithLocation() {
    fetchRestaurants();
  }

  async function handleSubmitWithLocationOne() {
    searchObject.amountOfOptions = 1;
    fetchRestaurants();
  }

  return (
    <div>
      <Navbar />
      <>
        {!user ? (
          <LoadingAnimation/>
        ) : (
          <>
            {!resultsFetched ? (
              <>
               <div className="min-h-screen bg-white font-yaro text-emerald-500 p-4 sm:p-8 lg:p-16">
                 {/* Section 1 */}
                    <div className="flex items-center justify-center mb-8">
                    <FunSearchButton text="JacarExplore 1" fetchData={handleSubmitWithLocationOne} />
                    <FunSearchButton text="JacarExplore 3" fetchData={handleSubmitWithLocation} />
                    </div>

                {/* Section 2 */}
                 <div className="flex flex-col items-center justify-center mb-8">
                   <h1 className="text-4xl font-bold mb-6">Dietary Restrictions</h1>
                   <ColorChangingButton setCount={setCount} count={count} setCuisineType={setCuisineType} cuisineType={cuisineType} setIncludeOthers={setIncludeOthers} includeOthers={includeOthers} text="Include Other Cuisines"/>
                   <ColorChangingButton setCount={setCount} count={count} setCuisineType={setCuisineType} cuisineType={cuisineType} setIncludeOthers={setIncludeOthers} includeOthers={includeOthers} text="Vegan" />
                   <ColorChangingButton setCount={setCount} count={count} setCuisineType={setCuisineType} cuisineType={cuisineType} setIncludeOthers={setIncludeOthers} includeOthers={includeOthers} text="Vegetarian" />
                 </div>

                 {/* Section 3 */}
                 <div className="flex flex-col items-center justify-center">
                   <h1 className="text-4xl font-bold mb-6">Distance</h1>
                   {/* <ColorChangingButton text="5 km" />
                   <ColorChangingButton text="10 km" />
                   <ColorChangingButton text="15 km" />
                   <ColorChangingButton text="20 km" />
                   <ColorChangingButton text="30 km" /> */}
                 </div>
             </div>
    

                {/* <h2 className="font-semibold p-2 shadow-md bg-green-50">
                  Choose your preferences
                </h2>
                <div className="border-solid border-b border-gray-200 px-8 flex justify-between p-3 w-100">
                  <label className="">Distance:</label>
                  <select className="" onChange={handleDistanceToTravel}>
                    <option></option>
                    <option>5km</option>
                    <option>10km</option>
                    <option>15km</option>
                    <option>20km</option>
                    <option>30km</option>
                  </select>
                </div>
                <div className="border-solid border-b border-gray-200 px-8 flex justify-between p-3 w-100">
                  <label className="">Price:</label>
                  <select onChange={handlePrice}>
                    <option></option>
                    <option>$</option>
                    <option>$$</option>
                    <option>$$$</option>
                    <option>$$$$</option>
                  </select>
                </div>
                <div className="border-solid border-b border-gray-200 px-8 flex justify-between p-3 w-100">
                  <label className="">Open Now?</label>
                  <select onChange={handleOpen}>
                    <option></option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
                <div className=" px-8 flex justify-between p-3 w-100">
                  <label className="">How Many Results:</label>
                  <select onChange={handleAmountOfOptions}>
                    <option></option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
                <h2 className="font-semibold p-2 shadow-md bg-green-50">
                  Choose at least one of the following options
                </h2>
                <div className="border-solid border-b border-gray-200 px-8 flex justify-between p-3 w-100">
                  <label className="">Cuisine:</label>
                  <select onChange={handleCuisineAdd}>
                    <option></option>
                    <option>Any</option>
                    <option>American</option>
                    <option>Brazilian</option>
                    <option>Chinese</option>
                    <option>French</option>
                    <option>Greek</option>
                    <option>Indian</option>
                    <option>Indonesian</option>
                    <option>Italian</option>
                    <option>Japanese</option>
                    <option>Korean</option>
                    <option>Lebanese</option>
                    <option>Mediterranean</option>
                    <option>Mexican</option>
                    <option>Middle Eastern</option>
                    <option>Spanish</option>
                    <option>Thai</option>
                    <option>Turkish</option>
                    <option>Vietnamese</option>
                  </select>
                </div>
                <div className="border-solid border-b border-gray-200 px-8 flex justify-between p-3 w-100">
                  <label className="">Shop type:</label>
                  <select onChange={handleCuisineAdd}>
                    <option></option>
                    <option>Bakery</option>
                    <option>Bar</option>
                    <option>Breakfast</option>
                    <option>Brunch</option>
                    <option>Cafe</option>
                    <option>Fast Food</option>
                    <option>Hamburger</option>
                    <option>Ice Cream</option>
                    <option>Pizza</option>
                    <option>Ramen</option>
                    <option>Sandwich Shop</option>
                    <option>Steak House</option>
                    <option>Sushi</option>
                  </select>
                </div>
                <div className="px-8 flex justify-between p-3 w-100">
                  <label className="">Dietary Options:</label>
                  <select onChange={handleCuisineAdd}>
                    <option></option>
                    <option>Vegetarian</option>
                    <option>Vegan</option>
                    <option>Seafood</option>
                  </select>
                </div>
                {cuisineTypeList.length > 0 && (
                  <ol className="">
                    <ul className="font-semibold p-2 shadow-md bg-green-50">
                      Click on the item to remove
                    </ul>
                    {cuisineTypeList.map((element, index) => (
                      <ul
                        className="flex p-1 border-b"
                        onClick={handleCuisineRemoval}
                        key={index}
                        a-key={index}
                      >
                        {element}
                      </ul>
                    ))}
                  </ol>
                )}
                {searchAvailable ? (
                  <div className="w-100">
                    <button
                      onClick={handleSubmitWithLocation}
                      className="mx-10 mb-4 mt-4 bg-emerald-500 rounded font-semibold text-white h-10 w-80 hover:bg-emerald-600"
                    >
                      Search
                    </button>
                  </div>
                ) : (
                  <div className="w-100">
                    <button className="mx-10 mb-4 mt-4 bg-emerald-500 rounded font-semibold text-white h-10 w-80 hover:bg-emerald-600">
                      Search
                    </button>
                  </div>
                )} */}
              </>
            ) : (
              <ResultList results={results} location={location} />
            )}{" "}
          </>
        )}
      </>
    </div>
  );
}
