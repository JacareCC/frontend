import React, { useState } from 'react';
import loadingGif from './GatorGatcha.gif';

const GatorGatcha = () => {
  
    return (
      <div className="flex justify-center items-center">
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
