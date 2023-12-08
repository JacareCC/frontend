import jacoin from "../../public/jacoin.jpg";
import { CircleDollarSign } from "lucide-react";


function priceLevelText(multiplier: number) {;
    return (
        <div className="flex items-center">
          {/* Row of images */}
          <div className="flex gap-4">
            {Array.from({ length: multiplier }, (_, index) => (
              // <img
              //   key={index}
              //   src={jacoin.src}
              //   alt="$"
              //   className="w-10 h-10 rounded-full"
              // />
             <div key={index} className="w-10 h-10">
            <CircleDollarSign className="w-full h-full rounded-full" />
          </div>
            ))}
          </div>
        </div>
      );
    }

export default priceLevelText;