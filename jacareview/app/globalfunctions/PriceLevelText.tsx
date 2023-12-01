import jacoin from "../../public/jacoin.jpg";


function priceLevelText(multiplier: number) {;
    return (
        <div className="flex items-center">
          {/* Single "$" */}
          <h1 className="mr-4">$ =</h1>
    
          {/* Row of images */}
          <div className="flex gap-4">
            {Array.from({ length: multiplier }, (_, index) => (
              <img
                key={index}
                src={jacoin.src}
                alt="$"
                className="w-10 h-10 rounded-full"
              />
            ))}
          </div>
        </div>
      );
    }

export default priceLevelText;