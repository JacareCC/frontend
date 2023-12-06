"use client"
import SavedRestaurants from "@/components/SavedRestaurants";
import "../../../app/globals.css"
import Navbar from "@/components/Navbar";
import NewNav from "@/components/NewNav";

// ... (previous imports)


export default function SavedRestaurantsPage() {
    return (
      <div className="max-w-screen-md mx-auto">
        <NewNav />
        <div className="flex items-center justify-center ">
          <div className="card w-full max-h-[500px] xl:max-h-[800] overflow-y-scroll scrollbar-thin p-4 px-4 py-2">
              <SavedRestaurants />
          </div>
        </div>
      </div>
    );
  }
  
  