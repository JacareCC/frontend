// components/GoogleMap.tsx
import React from 'react';

interface GoogleMapProps {
  apiKey: string |undefined;
  placeId: string | null;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ apiKey, placeId }) => {
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=place_id:${placeId}`;

  return (
    <div className="w-full h-96">
      <iframe
        className="w-full h-full"
        loading="lazy"
        allowFullScreen
        src={mapUrl}
      />
    </div>
  );
};

export default GoogleMap;
