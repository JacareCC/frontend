import SingleRestaurant from "./SingleRestaurant";
import { useEffect, useState } from "react";
import { getPreciseDistance } from "geolib";
import { GeolibInputCoordinates } from "geolib/es/types";

export default function ResultList({
  results,
  location,
}: {
  results: any;
  location: any;
}) {
  const [resultArray, setResultArray] = useState<any>(null);
  const [propFetched, setPropFetched] = useState<boolean>(false);
  const [singleClicked, setSingleClicked] = useState<boolean>(false);
  const [idForFetch, setIdForFetch] = useState<string>("");
  const [pageVisited, setPageVisited] = useState<boolean>(false);

  useEffect(() => {
    setResultArray(results.result);
  }, []);

  useEffect(() => {
    if (resultArray) {
      setPropFetched(true);
    }
    console.log(resultArray);
  }, [resultArray]);

  //handler

  function setView(event: any) {
    const stringId: string = event.target.getAttribute("a-key");
    setSingleClicked((prev: boolean) => !prev);
    setIdForFetch(stringId);
    setPageVisited((prev: boolean) => !prev);
  }

  //helper

  function getDistanceInApproxKm(
    point1: GeolibInputCoordinates,
    point2: GeolibInputCoordinates
  ) {
    console.log("point 2: ", point2);
    const metersDistance = getPreciseDistance(point1, point2);
    let kmDistance = metersDistance / 1000;
    let kmDistanceInString = kmDistance.toFixed(2);
    return kmDistanceInString;
  }

  return (
    <>
      {propFetched && !singleClicked && resultArray.length > 0 ? (
        resultArray.map((element: any, index: number) => {
          return (
            <div key={`b${index}`} onClick={setView}>
              <div a-key={element.id} key={index}>
                {element.displayName.text}
              </div>
              <div a-key={element.id} key={`a${index}`}>
                Distance:{" "}
                {element.location
                  ? getDistanceInApproxKm(element.location, location)
                  : "unknown"}{" "}
                km
              </div>
            </div>
          );
        })
      ) : (
        <SingleRestaurant
          pageVisited={pageVisited}
          setPageVisited={setPageVisited}
          setSingleClicked={setSingleClicked}
          idForFetch={idForFetch}
        />
      )}
    </>
  );
}
