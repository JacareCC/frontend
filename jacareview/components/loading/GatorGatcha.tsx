import React, { useState } from 'react';
import loadingGif from './GatorGatcha.gif';

const GatorGatcha = () => {
  
    return (
      <div className="z-10 fixed top-0 right-0 bottom-0 left-0 bg-white flex justify-center items-center">
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

export default GatorGatcha;
