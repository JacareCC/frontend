// components/LoadingAnimation.tsx
import React from 'react';
import loadingGif from './gator-eating-chopsticks-gif.gif';

const LoadingAnimation = () => {
  return (
    <div data-testid="loading-animation" className="fixed top-0 right-0 left-0 h-screen w-screen flex items-center justify-center bg-white">
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