import Image from "next/image";
import jacaDate from '../../public/jaca-date.png'


export default function LandingPageRewardsSlide(){

return(
    <div className="shadow-2xl m-2 rounded bg-gradient-to-r from-indigo-100 from-10% via-sky-100 via-30% to-emerald-100 to-90% text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
    <div className="flex p-2 gap-4">
      <div className="">
        <Image priority={true} className="rounded-lg" src={jacaDate} alt="logo" width={400} height={400} />
      </div>
      <div className="">
        <div><h2 className="font-yaro text-jgreen" >Incredible Rewards</h2></div>
        <div><p className="text-zinc-700  pl-2 pt-2">Earn exclusive rewards for reviewing. The more you share, the more benefits you receive.</p>
      </div>
    </div>
      </div>
    </div>
)

}

