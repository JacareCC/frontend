import React from 'react';
import Image from "next/image";
import logo from '../public/logo-nav-white.png'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initFirebase } from "@/firebase/firebaseapp";
import { useState, useEffect } from "react";
import MenuHamburger from './header_components/menuHamburger';

interface NavbarUserProps {
  userPhotoSrc: string | undefined;
  userName: string | null | undefined;
  userLevel: string | null | undefined;
}

const NavBarUser: React.FC<NavbarUserProps> = ({ userName, userLevel, userPhotoSrc }) => {
    

  return (
<div className='grid grid-cols-3 bg-jgreen pt-4 mb-2 shadow-2xl '>
  <div className="col-span-1 pl-4">
    <Image src={logo} alt="Logo" className="w-16 h-16" />
  </div>
  <div className="col-span-1 flex flex-col items-center p-2">
    <img src={userPhotoSrc} alt="User" className="w-30 h-30 rounded-full mb-2" />
    <div className='flex flex-col items-center my-2 gap-1'>
        <h2 className='font-yaro text-white text-sm'>{userName}</h2>
        <h3 className='font-yaro text-white text-xs'>{userLevel}</h3>
    </div>
  </div>
  <div className="col-span-1 flex justify-end pr-4">
    <div className='z-2 relative'>
      <MenuHamburger />
    </div>
  </div>
</div>

  );
}

export default NavBarUser;