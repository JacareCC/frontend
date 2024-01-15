import { useEffect, useState } from "react";
import PriceLevelComponent from "./priceLevel/PriceLevel";
import { getPreciseDistance } from "geolib";
import { GeolibInputCoordinates } from "geolib/es/types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GoogleMap from "./GoogleMap";
import { BookmarkIcon, MapPinIcon } from "lucide-react";
import {User as FirebaseUser} from "firebase/auth";
import GetHistoryObject from "../typeInterfaces/globals"

export default function Slideshow({
  slides,
  location,
  user,
}: {
  slides: any;
  location: GeolibInputCoordinates | null;
  user: FirebaseUser | null | undefined;
}) {
  const [resultArray, setResultArray] = useState<any>(null);
  const [autoplay, setAutoplay] = useState(true);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [historyData, setHistoryData] = useState<any>(null);

  useEffect(() => {
    if (slides) {
      setResultArray(slides.result);
      console.log(slides)
    }
  }, [slides]);

  useEffect(() => {
    if (user !== null && slides) {
      getHistoryData();
    }
  }, [user, slides]);

  useEffect(() => {
    if(historyData){
      console.log(historyData)
    }
  })

  const settings = {
    accessibility: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    swipeToSlide: true,
    focusOnSelect: false,
    autoplay: autoplay,
    autoplaySpeed: 7000,
    arrows: false,
    afterChange: (index: number) => {},
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
      let kmDistanceInString = kmDistance.toFixed(2) + " km";
      return kmDistanceInString;
    } else {
      return `${metersDistance} m`;
    }
  }

  async function getHistoryData() {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}user/profile/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${user?.uid}`,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setHistoryData(data.success.history);
      });
  }

  async function changeSaveRestaurant(restId: number) {
    const histRest = historyData.find(
      (rest: { restaurant_id_id: number }) => rest.restaurant_id_id === restId
    );

    try {
      const isRestaurantSaved = historyData.some(
        (rest: { restaurant_id_id: number; saved: boolean }) =>
          rest.restaurant_id_id === restId && rest.saved
      );

      if (!isRestaurantSaved) {
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}user/favorites/add/`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              uid: user?.uid,
              restaurantId: restId,
              id: histRest?.id,
            }),
          }
        );

        if (result.ok) {
          const restaurantIndex = historyData.findIndex(
            (rest: { restaurant_id_id: number }) =>
              rest.restaurant_id_id === restId
          );

          if (restaurantIndex !== -1) {
            const updatedHistoryData = [...historyData];
            updatedHistoryData[restaurantIndex] = { ...histRest, saved: true };
            setHistoryData(updatedHistoryData);
          }
        } else {
          console.error("Error:", result.statusText);
        }
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  return (
    <Slider {...settings} className="max-w-screen-md mx-auto">
      {resultArray &&
        resultArray.map((slide: any, index: number) => (
          <div
            data-testid="slide-show"
            key={index}
            className="flex flex-col justify-center items-center md:p-4"
          >
            <div className="flex flex-col  justify-center items-center text-jgreen text-xl mb-2">
              <h1 className=" mb-4 mt-4 ">{slide.displayName.text}</h1>
            </div>
            {slide.location && (
              <GoogleMap
                apiKey={apiKey}
                placeId={slide.place_id}
                location={slide.location}
                mylocation={location}
                user={user}
              />
            )}
            <div className="flex flex-col  justify-center items-center m-2 text-jgreen text-lg">
              Distance:{" "}
              {slide.location && location
                ? getDistanceInApproxKm(slide.location, location)
                : "unknown"}{" "}
              {slide.priceLevel ? (
                <div className="text-jgreen">
                  <PriceLevelComponent priceLevel={slide.priceLevel} />
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="flex justify-center items-center gap-4 pb-4">
              <a
                className="flex justify-center gap-2 mt-2 bg-jgreen text-white p-2 rounded shadow-lg shadow-xl w-36"
                href={`https://www.google.com/maps/search/?api=1&query=${slide.displayName.text.replace(
                  / /g,
                  "+"
                )}&location=${slide.location.latitude},${
                  slide.location.longitude
                }&query_place_id=${slide.place_id}`}
                target="_blank"
              >
                Go to Maps
                <MapPinIcon />
              </a>
              {historyData &&
              historyData.some(
                (rest: { restaurant_id_id: number; saved: boolean }) =>
                  rest.restaurant_id_id === slide.id && rest.saved
              ) ? (
                <button
                  key={`${index}`}
                  onClick={() => changeSaveRestaurant(slide.id)}
                  className="flex w-36 gap-2 mt-2 bg-gray-300 text-white p-2 rounded shadow-lg shadow-xl flex justify-center items-center"
                  disabled
                >
                  Saved
                  <BookmarkIcon />
                </button>
              ) : (
                <button
                  key={`${index}`}
                  onClick={() => changeSaveRestaurant(slide.id)}
                  className="flex w-36 gap-2 mt-2 bg-lgreen  text-white p-2 rounded shadow-lg shadow-xl flex justify-center items-center"
                >
                  Save
                  <BookmarkIcon />
                </button>
              )}
            </div>
          </div>
        ))}
    </Slider>
  );
}
