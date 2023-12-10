import Image from "next/image";
import jacareEat from '../../public/jaca-eat.png'

export default function LandingPageSearchSlide(){

return(
<div className="shadow-2xl m-2 rounded bg-gradient-to-r from-indigo-100 from-10% via-sky-100 via-30% to-emerald-100 to-90%">
                    <div className="flex p-2 gap-4">
                      <div className="">
                        <Image className="rounded-lg" src={jacareEat} alt="logo" width={400} height={400} />
                      </div>
                      <div className="mx-auto">
                        <div><h2 className="font-yaro text-jgreen text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl" >Simple and Fast Search</h2></div>
                        <div><p className="text-zinc-700  pl-2 pt-2 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">One Click Search. Avoid decision paralysis and explore a variety of culinary options nearby. Finding the perfect restaurant is now easier than ever.</p>
                      </div>
                      </div>
                    </div>
                    </div>
)

}