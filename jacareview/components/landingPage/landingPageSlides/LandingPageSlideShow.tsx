import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LandingAnonReviewsSlide from './LandingPageAnonReviews';
import LandingPageBusinessSlide from './LandingPageBusinessSlide';
import LandingPageRewardsSlide from './LandingPageRewards';
import LandingPageSearchSlide from './LandingPageSearchSlide';

export default function LandingPageSlideshow() {
   
    const [autoplay, setAutoplay] = useState(true);
   
  
    useEffect(() => {
      console.log(autoplay)
    }, [autoplay]);
  
    const settings = {
        accessibility:true,
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '0',
      swipeToSlide: true,
      focusOnSelect: false,
      autoplay: autoplay,
      autoplaySpeed: 7000,
      arrows:true,
      pauseOnHover:true,
   
    };

    

    function handlePause(){
        setAutoplay((prev: boolean) => !prev)
    }
   
  
    return (
        <div onClick={handlePause}>
        <Slider  {...settings} className="mx-auto">
          <LandingPageSearchSlide/>
          <LandingAnonReviewsSlide/>
          <LandingPageRewardsSlide/>
          <LandingPageBusinessSlide/>
        </Slider>
        </div>
      );
                  }      