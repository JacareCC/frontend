// components/GoogleMap.tsx
import { Loader } from '@googlemaps/js-api-loader';
import React, { useRef, useEffect, useState } from 'react';
import searching from "../public/IMG_8629.png"
import GenericShop from "../public/GenericShopColor.png"

interface GoogleMapProps {
  apiKey: string |undefined;
  placeId: string | null;
  location: any;
  mylocation: any;
  user: any;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ apiKey, placeId, location, mylocation, user}) => {
  const mapRef = useRef(null);  

  console.log(placeId)

  useEffect(()=>{
    initMap();
  },[])


  const initMap = async () =>{
    const myLatLng = { lat: mylocation.latitude, lng: mylocation.longitude };
    const storeLatLng = { lat: location.latitude, lng: location.longitude };
      const loader = new Loader({apiKey: apiKey as string, version: "weekly"});
      const { Map } = await loader.importLibrary("maps");
      const { AdvancedMarkerElement, PinElement } = await loader.importLibrary("marker");
      const position = {
        lat: location.latitude,
        lng: location.longitude
      }
  
      

     const  mapOtions: google.maps.MapOptions = {
      center: storeLatLng,
      zoom: 17, 
     }

     const map = new Map(mapRef.current, mapOtions)

     

     const storeImage = {
      url: GenericShop.src,
      scaledSize: new google.maps.Size(50, 50)
  };

  const profileImage = {
    url: user?.photoURL || searching.src,
    scaledSize: new google.maps.Size(50, 50)
};



     new google.maps.Marker({
      position: storeLatLng,
      map,
      icon: storeImage,
      title: "Shop Location",
    });
     
     new google.maps.Marker({
      position: myLatLng,
      map,
      icon: profileImage,
      title: "Your Location",
    });
  }


  return (
    <div style={{ height: "500px", marginLeft: "12px", marginRight: "12px" }} ref={mapRef}>
    
  </div>
  );
};

export default GoogleMap;


