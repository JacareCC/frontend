import { useEffect, useState } from 'react';
import PriceLevelComponent from './priceLevel/PriceLevel';
import { getPreciseDistance } from "geolib";
import { GeolibInputCoordinates } from "geolib/es/types";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import GoogleMap from './GoogleMap';


export default function Slideshow({ slides, location, user }: { slides: any; location: any, user:any }) {
    const [resultArray, setResultArray] = useState<any>(null);
    const [autoplay, setAutoplay] = useState(true);
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
    useEffect(() => {
      setResultArray(slides.result);
      console.log(slides.result)
    }, [slides]);
  
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
      afterChange: (index: number) => {
        
      },
      onClick: () => {
        
        setAutoplay((prev: boolean) => !prev);
      },
    };
  
    function getDistanceInApproxKm(
      point1: GeolibInputCoordinates,
      point2: GeolibInputCoordinates
    ) {
      const metersDistance = getPreciseDistance(point1, point2);
  
      if (metersDistance >= 1000) {
        let kmDistance = metersDistance / 1000;
        let kmDistanceInString = kmDistance.toFixed(2) + ' km';
        return kmDistanceInString;
      } else {
        return `${metersDistance} m`;
      }
    }
  
    return (
        <Slider {...settings} className="max-w-screen-md mx-auto">
          {resultArray &&
            resultArray.map((slide: any, index: number) => (
              <div
                key={index}
                className="flex flex-col  justify-center items-center md:py-4"
              >
                <div className="flex flex-col  justify-center items-center text-jgreen text-xl mb-2">
                    <h1 className=' mb-4 mt-4 '>{slide.displayName.text}</h1>
                </div>
                  {slide.location && <GoogleMap apiKey={apiKey} placeId={slide.place_id} location={slide.location} mylocation={location} user={user} />}
                <div className="flex flex-col  justify-center items-center m-2 text-jgreen text-lg">
                  Distance:{' '}
                  {slide.location ? getDistanceInApproxKm(slide.location, location) : 'unknown'}{' '}
                </div>
                <a className='flex flex-col  justify-center items-center w-[80] rounded bg-jgreen text-white px-4 py-2 m-2' href={`https://www.google.com/maps/place/?q=place_id:${slide.place_id}`} target='_blank'>Click to go to Google Maps</a>
                <div className="flex flex-col  justify-center items-center text-gray-600">
                  {slide.priceLevel ? (
                    <PriceLevelComponent priceLevel={slide.priceLevel} />
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            ))}
        </Slider>
      );
                  }      