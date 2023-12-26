import { CircleDollarSign } from "lucide-react";
import React from "react";


function priceLevelText(multiplier: number) {;
    return (
        <div className="flex items-center">
          {/* Row of images */}
          <div data-testid="circleDollarSign" className="flex gap-4">
            {Array.from({ length: multiplier }, (_, index) => (
             <div key={index} className="w-10 h-10">
            <CircleDollarSign data-testid="circleDollarSign" className="w-full h-full rounded-full" />
          </div>
            ))}
          </div>
        </div>
      );
    }

export default priceLevelText;