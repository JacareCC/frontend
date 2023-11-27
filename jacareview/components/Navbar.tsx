import React from 'react';
import { Menu } from 'lucide-react';
import Image from "next/image";
import logo from '../public/logo-nav-white.png'


interface NavbarProps {
  logoSrc: string | null | undefined;
  userPhotoSrc: string | null | undefined;
  userName: string | null | undefined
}

const Navbar: React.FC<NavbarProps> = ({ userPhotoSrc }) => {
  return (
    <div className="fixed top-0 left-0 right-0 flex items-center align-center  p-4 bg-jgreen text-white">
      <div className='basis-5/6'>
        <Image src={logo} alt="Logo" className="w-12 h-12" />
      </div>
      <div className='basis-1/6'>
        {/* img need to be userPhotoSrc */}
        <img src={"https://lh3.googleusercontent.com/a/ACg8ocKAalEpszt2x7xUbGd83X4q3yiD885_E7QfuzlxVIwGX-k=s96-c"} alt="User" className="w-8 h-8 rounded-full" />
      </div>
      <Menu className='basis-1/6' />
    </div>
  );
};

export default Navbar;