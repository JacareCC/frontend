// components/LoadingAnimation.tsx
import React from 'react';
import loadingGif from './gator-eating-chopsticks-gif.gif';

const LoadingAnimation = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-emerald-500 p-2 rounded-full w-80">
        <img
          src={loadingGif.src}
          alt="Loading"
          className="w-full h-full rounded-full border-2 border-white"
        />
      </div>
    </div>
  );
};


export default LoadingAnimation;