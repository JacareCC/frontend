// import { useEffect, useState } from "react";
// import { getPreciseDistance } from "geolib";
// import { GeolibInputCoordinates } from "geolib/es/types";
// import PriceLevelComponent from "./priceLevel/PriceLevel";
// // import jacoin from "../public/jacoin.jpg"



// export default function ResultList({
//   results,
//   location,
// }: {
//   results: any;
//   location: any;
// }) {
//   const [resultArray, setResultArray] = useState<any>(null);
//   const [propFetched, setPropFetched] = useState<boolean>(false);
//   const [singleClicked, setSingleClicked] = useState<boolean>(false);
//   const [idForFetch, setIdForFetch] = useState<string>("");
//   const [pageVisited, setPageVisited] = useState<boolean>(false);
//   const [resultArrayLength, setResultArrayLength] = useState<number | null>(null);
  

//   useEffect(() => {
//     setResultArray(results.result);
//     setResultArrayLength(results.result.length);

//   }, []);

//   useEffect(() => {
//     if (resultArray) {
//       setPropFetched(true);
//     }
//   }, [resultArray]);
  

//   //handler

//   function setView(event: any) {
//     const stringId: string = event.target.getAttribute("a-key");
//     setSingleClicked((prev: boolean) => !prev);
//     setIdForFetch(stringId);
//     setPageVisited((prev: boolean) => !prev);
//   }

//   //helper

//   function getDistanceInApproxKm(
//     point1: GeolibInputCoordinates,
//     point2: GeolibInputCoordinates
//   ) {
//     const metersDistance = getPreciseDistance(point1, point2);

//     if (metersDistance >= 1000){
//     let kmDistance = metersDistance / 1000;
//     let kmDistanceInString = kmDistance.toFixed(2) + " km";
//     return kmDistanceInString;
//   }
//   else{
//     return `${metersDistance} m`
//   }
// }

// return (
//   <>
//     {propFetched && resultArray.length ? (
//       resultArray.length > 1 ? (
//         <div className="mt-24"> 
//           {resultArray.map((element: any, index: number) => (
//             <div
//               key={`b${index}`}
//               a-key={element.id}
//               onClick={setView}
//               className="bg-white p-4 mb-4 rounded-lg shadow-md relative"
//             >
//               <div
//                 a-key={element.id}
//                 key={index}
//                 className="text-emerald-500 font-yaro text-lg font-bold"
//               >
//                 {element.displayName.text}
//               </div>
//               <div
//                 a-key={element.id}
//                 key={`a${index}`}
//                 className="text-gray-600 font-yaro"
//               >
//                 Distance:{" "}
//                 {element.location
//                   ? getDistanceInApproxKm(element.location, location)
//                   : "unknown"}{" "}
//               </div>
//               <div
//                 a-key={element.id}
//                 key={`c${index}`}
//                 className="text-gray-600 font-yaro absolute top-1/2 right-0 transform -translate-y-1/2 mr-8"
//               >
//                 {element.priceLevel ? (
//                   <PriceLevelComponent priceLevel={element.priceLevel} />
//                 ) : (
//                   <div>Price Unknown</div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <SingleRestaurant
//           pageVisited={pageVisited}
//           setPageVisited={setPageVisited}
//           setSingleClicked={setSingleClicked}
//           idForFetch={`${resultArray[0]?.id}`}
//           priceLevel={resultArray[0]?.priceLevel}
//           resultArrayLength={resultArrayLength}
//         />
//       )
//     ) : null}
//   </>
// );

//       }