"use client"
import SavedRestaurants from "@/components/SavedRestaurants";
import "../../../app/globals.css"
import Navbar from "@/components/Navbar";
import NewNav from "@/components/NewNav";

// ... (previous imports)


export default function SavedRestaurantsPage() {
    return (
        <><NewNav />
        <div className="flex flex-col md:flex-row container mx-auto md:mt-10 md:shadow-2xl md:bg-test rounded">
            <div className="sm:mt-0 md:w-1/2  w-full">
                <img className="md:rounded-l" src='../jaca-phone.png' alt="Gator Searching" />
            </div>
            <div className="md:basis-1/2 flex bg-test  flex-col items-center container mx-auto  md:shadow-2xl rounded">
                <h1 className="text-2xl pt-2 font-semibold m-2">My Saved Restaurants</h1>
                <div className="w-full bg-white ">
                    <SavedRestaurants />
                </div>
            </div>

        </div></>
    );
}