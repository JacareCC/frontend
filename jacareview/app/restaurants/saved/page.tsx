"use client"
import SavedRestaurants from "@/components/savedRestaurants/SavedRestaurants";
import "../../../app/globals.css"
import NewNav from "@/components/NewNav";
import { useState } from "react";


export default function SavedRestaurantsPage() {
    const [randomOneClicked, setRandomOneClicked] = useState<boolean>(false);

    function handleRandomGo(){
        setRandomOneClicked(true)
    }

    return (
        <><NewNav />
        <div className="flex flex-col md:flex-row container mx-auto md:mt-10 md:shadow-2xl md:bg-test rounded">
            <div className="sm:mt-0 md:w-1/2  w-full">
                <img className="md:rounded-l" src='../jaca-phone.png' alt="Gator Searching" />
            </div>
            <div className="md:basis-1/2 flex bg-test  flex-col items-center container mx-auto  md:shadow-2xl rounded">
                <h1 className="text-2xl pt-2 font-semibold m-2">My Saved Restaurants</h1>
                <button onClick={handleRandomGo} className="bg-gradient-to-r mb-4 from-yellow-500 via-red-500 to-pink-500 text-white px-6 py-3 rounded shadow-md hover:scale-105 transform transition-transform duration-300">
                    Surprise me!
                    </button>

                <div className="w-full bg-white ">
                    <SavedRestaurants randomOneClicked={randomOneClicked} setRandomOneClicked={setRandomOneClicked}/>
                </div>
            </div>

        </div></>
    );
}