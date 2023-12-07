import {
  PaperAirplaneIcon,
  MoonIcon,
  SunIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initFirebase } from "@/firebase/firebaseapp";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import {  signOut } from 'firebase/auth';


function NewNav() {
    
    initFirebase();
    const auth = getAuth(); 
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    const handleLogout = async () => {
        const auth = getAuth();
        await signOut(auth);
        router.push('/');
    };

  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="">
      <nav>
        <div className="mx-auto">
          <div className="flex mx-auto justify-between">
          <div className="flex items-center md:justify-around w-full mx-auto my-12 md:ml-8 md:mr-16 lg:ml-4 lg:mr-8 xl:ml-8 xl:mr-4">

              <div>
                <a
                  href="/"
                  className="flex gap-1 font-bold text-gray-700 items-center "
                >
                  <img className="h-16 w-16 text-primary mx-6 " src="/logo-home-.png"  />
                  <span className="font-yaro text-jgreen text-2xl" >jacareview</span>
                </a>
              </div>
              {/* primary */}
              <div className="hidden lg:p-6  lg:flex lg:justify-between lg:gap-12 text-jgreen">
                {user && (
                <><a href="/search">Search</a><a href="/user">Profile</a><a href="/restaurants/saved">Saved Restaurants</a><a href="/user/business">My Business</a><button onClick={handleLogout} className="text-jgreen">
                                      Logout
                                  </button></>
                    )}
              </div>
            </div>
            {/* secondary */}
            <div className="flex gap-6 mr-1 md:mr-5">
                
              <div className="hidden xs:flex items-center gap-10">
                <div className="hidden lg:flex items-center gap-2">
                  <MoonIcon className="h-6 w-6" />
                  <SunIcon className="h-6 w-6" />
                </div>
                <div>
                  <button className="rounded-full border-solid border-2 border-gray-300 py-2 px-4 hover:bg-gray-700 hover:text-gray-100">
                    Free Trial
                  </button>
                </div>
              </div>
              {/* Mobile navigation toggle */}
              <div className="lg:hidden flex items-center m-4 text-jgreen">
                <button onClick={() => setToggleMenu(!toggleMenu)}>
                  <Bars3Icon className="h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* mobile navigation */}
        <div
          className={`fixed z-40 w-full  bg-white overflow-hidden flex flex-col lg:hidden gap-12  origin-top duration-700 ${
            !toggleMenu ? "h-0" : "h-full"
          }`}
        >
          <div className="px-8">
            <div className="flex flex-col gap-8 font-bold tracking-wider text-jgreen">
              <a href="/search">Search</a>
              <a href="/user">Profile</a>
              <a href="/restaurants/saved">Saved Restaurants</a>
              <a href="/user/business">My business</a>
              <a href="#" onClick={handleLogout}>Logout</a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NewNav;