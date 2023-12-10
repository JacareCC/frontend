import Image from "next/image";
import jacaBusiness from '../../../public/jaca-business.png'


export default function LandingPageBusinessSlide(){

return(
<div className="shadow-2xl m-2 rounded bg-gradient-to-r from-emerald-100 from-10% via-sky-100 via-30% to-indigo-100 to-90% text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                      <div className="flex p-2 gap-4">
                        <div className="">
                          <div><h2 className="font-yaro text-jgreen" >For your business</h2></div>
                          <div><p className="text-zinc-700  pl-2 pt-2">Enhance Your Online Presence. Receive Genuine Feedback. Reward Your Customers.</p>
                        </div>
                        </div>
                        <div className="">
                          <Image priority={true} className="rounded-lg" src={jacaBusiness} alt="logo" width={400} height={400} />
                        </div>
                      </div>
                    </div>
)

}
