import React from 'react';
import Image from "next/image";
import logo from '../public/logo-nav-white.png'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initFirebase } from "@/firebase/firebaseapp";
import { useState, useEffect } from "react";
import MenuHamburger from './header_components/menuHamburger';

interface NavbarProps {
  logoSrc: string | null | undefined;
  userPhotoSrc: string | null | undefined;
  userName: string | null | undefined
}

const Navbar = () => {
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
    <div className="fixed top-0 left-0 right-0 flex items-center align-center  p-4 bg-jgreen text-white">
      <div className='basis-5/6'>
        <Image src={logo} alt="Logo" className="w-12 h-12" />
      </div>
      <div className='basis-1/6'>
        <img src={userPhoto} alt="User" className="w-8 h-8 rounded-full" />
      </div>
      <MenuHamburger />
    </div>
    </div>
  );
};

export default Navbar;