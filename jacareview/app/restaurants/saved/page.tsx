"use client"
import SavedRestaurants from "@/components/savedRestaurants/SavedRestaurants";
import "../../../app/globals.css"
import NewNav from "@/components/navbarComponents/NewNav";
import { useState } from "react";


export default function SavedRestaurantsPage() {
    const [randomOneClicked, setRandomOneClicked] = useState<boolean>(false);

    function handleRandomGo(){
        setRandomOneClicked(true)
    }

    return (
        <><NewNav />
         <div className="flex flex-col bg-test md:flex-row items-center container mx-auto md:shadow-2xl rounded">
            <div className="flex justify-center items-center">
            <div className="w-full sm:ml-0 md:ml-4 mb-4">
    <img className="sm: ml-0 md:rounded md:w-full md:h-full" src='../jaca-phone.png' alt="Gator Searching" />
  </div>
  </div>
  <div className="flex flex-col items-center container mx-auto md:shadow-2xl rounded md:ml-4">
    <h1 className="text-2xl pt-2 font-semibold m-2">My Saved Restaurants</h1>
    <button onClick={handleRandomGo} className="bg-gradient-to-r mb-4 from-yellow-500 via-red-500 to-pink-500 text-white px-6 py-3 rounded shadow-md hover:scale-105 transform transition-transform duration-300">
      Surprise me!
    </button>
    <div className="w-full bg-white rounded mx-2 md: w-1/2">
      <SavedRestaurants randomOneClicked={randomOneClicked} setRandomOneClicked={setRandomOneClicked}/>
    </div>
  </div>
</div>
        </>
    );
}