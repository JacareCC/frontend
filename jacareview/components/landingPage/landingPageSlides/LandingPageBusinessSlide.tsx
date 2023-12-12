import Image from "next/image";
import jacaBusiness from '../../../public/jaca-business.png'


export default function LandingPageBusinessSlide(){

return(
<div className="h-[35vh] shadow-2xl m-2 rounded bg-gradient-to-r from-emerald-100 from-10% via-sky-100 via-30% to-indigo-100 to-90% text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                      <div className="flex p-2 gap-4">
                        <div className="flex flex-col">
                          <div><h2 className="font-yaro text-jgreen p-2" >For Your Business</h2></div>
                          <div><p className="text-zinc-700  pl-2 pt-2">Enhance Your Online Presence. Receive Genuine Feedback. Reward Your Customers.</p>
                        </div>
                        </div>
                        <div className="">
                          <Image priority={true} className="h-[32vh] rounded-lg" src={jacaBusiness} alt="logo" width={400} height={400} />
                        </div>
                      </div>
                    </div>
)

}
