import Image from "next/image";
import jacaBusiness from '../../../public/jaca-business.png'


export default function LandingPageBusinessSlide(){

return(
<div className="max-w-full h-[50vh] md:h-[35vh] shadow-2xl m-2 rounded bg-gradient-to-r from-emerald-100 from-10% via-sky-100 via-30% to-indigo-100 to-90% text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                      <div className="flex h-fit p-2 gap-4 flex-col md:flex-row">
                      <div className="flex flex-col md:w-[70%] p-2">
    <div>
    <h2 className="font-yaro text-jgreen p-2" >For Your Business</h2></div>
                          <div><p className="text-zinc-700  pl-2 pt-2">Enhance Your Online Presence. Receive Genuine Feedback. Reward Your Customers.</p>
                        </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <Image priority={true} className="rounded-lg w-[245px] mt-2 h-[30vh]" src={jacaBusiness} alt="logo" width={400} height={400} />
                        </div>
                      </div>
                    </div>
)

}
