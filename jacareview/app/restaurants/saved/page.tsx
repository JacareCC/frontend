"use client"
import SavedRestaurants from "@/components/SavedRestaurants";
import "../../../app/globals.css"
import Navbar from "@/components/Navbar";

export default function SavedRestaurantsPage(){

    return(
        <div className="max-w-screen-md mx-auto">
            <Navbar/>
            <SavedRestaurants/>
        </div>
    )
}