"use client"
import SavedRestaurants from "@/components/SavedRestaurants";
import "../globals.css"
import Navbar from "@/components/Navbar";

export default function SavedRestaurantsPage(){

    return(
        <div>
        <Navbar/>
        <SavedRestaurants/>
        </div>
    )
}