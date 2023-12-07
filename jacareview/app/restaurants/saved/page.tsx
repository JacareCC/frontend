"use client"
import SavedRestaurants from "@/components/SavedRestaurants";
import "../../../app/globals.css"
import Navbar from "@/components/Navbar";
import NewNav from "@/components/NewNav";

// ... (previous imports)


export default function SavedRestaurantsPage() {
    return (
        <><NewNav /><div className="">
            <div className="flex flex-col items-center container mx-auto md:mt-10 md:shadow-2xl rounded">
                <div className="w-full md:3/4 lg:w-3/4 xl:w-2/3">
                    <SavedRestaurants />
                </div>
            </div>
        </div></>
    );
  }
  
  