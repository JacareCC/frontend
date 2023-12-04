// components/GoogleMap.tsx
import { Loader } from '@googlemaps/js-api-loader';
import { version } from 'os';
import React, { useRef, useEffect } from 'react';

interface GoogleMapProps {
  apiKey: string |undefined;
  placeId: string | null;
  location: any
}

const GoogleMap: React.FC<GoogleMapProps> = ({ apiKey, placeId, location }) => {

  const mapRef = useRef(null);

  useEffect(()=>{
    initMap();
  },[])

  const initMap = async () =>{
      const loader = new Loader({apiKey: apiKey as string, version: "weekly"});
      const { Map } = await loader.importLibrary("maps");
      const position = {
        lat: location.latitude,
        lng: location.longitude
      }

     const  mapOtions: google.maps.MapOptions = {
      center: position,
      zoom: 17, 
     }

     const map = new Map(mapRef.current, mapOtions)
  }

  // const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=place_id:${placeId}`;

  return (
    <div style={{height:"600px"}} ref={mapRef}>
      
    </div>
    // <div className="w-full h-96 rounded-full overflow-hidden">
    //   <iframe
    //     className="w-full h-full rounded-full overflow-hidden"
    //     loading="lazy"
    //     allowFullScreen
    //     src={mapUrl}
    //   />
      
    // </div>
  );
};

export default GoogleMap;


