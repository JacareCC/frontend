import Image from "next/image";
import jacaDate from '../../../public/jaca-date.png'


export default function LandingPageRewardsSlide(){

return(
    <div className="h-[35vh] shadow-2xl m-2 rounded bg-gradient-to-r from-indigo-100 from-10% via-sky-100 via-30% to-emerald-100 to-90% text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
    <div className="h-full flex p-2 gap-4">
      <div className="flex flex-col">
        <Image priority={true} className="h-[32vh] rounded-lg" src={jacaDate} alt="logo" width={400} height={400} />
      </div>
      <div className="">
        <div><h2 className="font-yaro text-jgreen p-2" >Incredible Rewards</h2></div>
        <div><p className="text-zinc-700  pl-2 pt-2">Earn exclusive rewards for reviewing. The more you share, the more benefits you receive.</p>
      </div>
    </div>
      </div>
    </div>
)

}

