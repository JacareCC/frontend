import { useEffect, useState } from 'react';
import PriceLevelComponent from './priceLevel/PriceLevel';
import { getPreciseDistance } from "geolib";
import { GeolibInputCoordinates } from "geolib/es/types";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import GoogleMap from './GoogleMap';


export default function Slideshow({ slides, location }: { slides: any; location: any }) {
    const [resultArray, setResultArray] = useState<any>(null);
    const [autoplay, setAutoplay] = useState(true);
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
    useEffect(() => {
      setResultArray(slides.result);
      console.log(slides.result)
    }, [slides]);
  
    const settings = {
        accessibility:true,
      dots: false,
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
        <Slider {...settings} className="flex items-center justify-center h-screen mt-16">
          {resultArray &&
            resultArray.map((slide: any, index: number) => (
              <div
                key={index}
                className="bg-white p-4 mb-4 rounded-lg shadow-md w-screen md:w-4/5 lg:w-3/5 mx-auto overflow-hidden h-screen flex flex-col justify-center items-center text-center"
              >
                <div className="text-emerald-500 font-yaro text-lg font-bold mb-2">
                  {slide.displayName.text}
                  {slide.location && <GoogleMap apiKey={apiKey} placeId={slide.place_id} location={slide.location} />}
                </div>
                <div className="text-gray-600 font-yaro mb-2">
                  Distance:{' '}
                  {slide.location ? getDistanceInApproxKm(slide.location, location) : 'unknown'}{' '}
                </div>
                <div className="text-gray-600 font-yaro">
                  {slide.priceLevel ? (
                    <PriceLevelComponent priceLevel={slide.priceLevel} />
                  ) : (
                    <div>Price Unknown</div>
                  )}
                </div>
              </div>
            ))}
        </Slider>
      );
                  }      