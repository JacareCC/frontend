import React from 'react';
import Image from "next/image";
import logo from '../public/logo-nav-white.png'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initFirebase } from "@/firebase/firebaseapp";
import { useState, useEffect } from "react";
import MenuHamburger from './header_components/menuHamburger';
import MenuHamburgerHome from './header_components/MenuHamburgerHome';

const NavbarHome = () => {
  const[ userPhoto, setUserPhoto] = useState<string | undefined>(undefined);

  initFirebase();
  const auth = getAuth(); 
  const [user, loading] = useAuthState(auth);
  
  useEffect (() => {
    if(user) {
      if(user.photoURL)
      setUserPhoto(user?.photoURL)
    }
  }, [user]);


  return (
    <div className='m-20'>
    <div className=" fixed flex justify-end top-0 right-0 left-0 p-4 bg-jgreen text-white">
        <MenuHamburgerHome />
    </div>
    </div>
  );
};

export default NavbarHome;