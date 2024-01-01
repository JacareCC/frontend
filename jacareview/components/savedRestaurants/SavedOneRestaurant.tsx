"use client";
import React, { useState, useEffect } from "react";
import RandomOneRestaurant from "@/app/globalfunctions/RandomOneRestaurant";
import CalculateTimeDifference from "@/app/globalfunctions/CalculateTimeDifference";
import { Star } from "lucide-react";
import Link from "next/link";
import GatorGatcha from "../loading/GatorGatcha";
import { getPreciseDistance } from "geolib";
import { GeolibInputCoordinates } from "geolib/es/types";

interface SavedOneProps {
  savedData: any;
  setRandomOneClicked: any;
  location: GeolibInputCoordinates;
}

const SavedOneRestaurant: React.FC<SavedOneProps> = ({
  location,
  savedData,
  setRandomOneClicked,
}) => {
  const [randomRestaurant, setRandomRestaurant] = useState<any>(null);
  const [randomCount, setRandomCount] = useState<number>(0);
  const [showAlligator, setShowAlligator] = useState<boolean>(false);

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

  useEffect(() => {
    showAnimation();
    let randomOne = RandomOneRestaurant(savedData);
    setRandomRestaurant(randomOne);
  }, []);

  useEffect(() => {
    if (randomCount >= 1) {
      showAnimation();
      let newRandomOne = RandomOneRestaurant(savedData);
      setRandomRestaurant(newRandomOne);
    }
  }, [randomCount]);

  function showAnimation() {
    setShowAlligator(true);
    setTimeout(() => {
      setShowAlligator(false);
    }, 2000);
  }

  function goBack() {
    setRandomRestaurant(null);
    setRandomOneClicked((prev: boolean) => {
      !prev;
    });
  }

  function handleReroll() {
    setRandomCount((prev: number) => (prev += 1));
  }
  return (
    <>
      {showAlligator && (
        <div className="">
          <GatorGatcha />
        </div>
      )}
      {randomRestaurant && (
        <div className="bg-test flex flex-col items-center shadow-xl w-11/12 mx-6 my-2 rounded bg-gray-100 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl px-2 py-4">
          <div className="flex items-center justify-center">
            <button
              onClick={handleReroll}
              className="bg-gradient-to-r mb-4 mt-4 ml-4 from-yellow-500 via-red-500 to-pink-500 text-white px-6 py-3 rounded shadow-md hover:scale-105 transform transition-transform duration-300"
            >
              Surprise me Again!
            </button>
          </div>
          <div className="flex flex-col items-center w-full font-semibold border-b pb-4">
            {randomRestaurant.name}
          </div>
          <div className="md:pl-2">
            Viewed {CalculateTimeDifference(randomRestaurant.date_visited)}
          </div>
          {randomRestaurant.location && location && (
            <div key="currentDistance" className="md:pl-2">
              Current Distance:{" "}
              {getDistanceInApproxKm(randomRestaurant.location, location)}
            </div>
          )}
          <Link
            href={`/review/?restaurant=${randomRestaurant.restaurant_id_id}`}
            className="w-full mt-2 bg-jgreen text-jyellow p-2 rounded shadow-lg shadow-xl flex justify-center items-center gap-4"
          >
            Review
            <Star />
          </Link>
          <div className="flex w-full items-center">
            <a
              className="w-full flex items-center justify-center rounded bg-secl text-white px-4 py-2 mt-2"
              href={`https://www.google.com/maps/place/?q=place_id:${randomRestaurant.googlePlaceId} `}
              target="_blank"
            >
              Go to map
            </a>
          </div>
          <div className="flex flex-row">
            <button
              onClick={goBack}
              className="bg-jgreen text-white px-4 py-2 rounded mt-4"
            >
              Back to Full List
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SavedOneRestaurant;
