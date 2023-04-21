import React from "react";
import GoogleMapReact from "google-map-react";

const Marker = () => {
  const text = "A";
  const color = "red";
  return <i className="fa-solid fa-location-dot"></i>;
};

const Map = () => {
  const center = {lat: 13.75, lng: 100.53};
  const zoom = 11;
  const stops = [
    {id: 1, name: "A", lat: 13.73, lng: 100.56, color: "red"},
    {id: 2, name: "B", lat: 13.74, lng: 100.53, color: "blue"},
    {id: 3, name: "C", lat: 13.75, lng: 100.54, color: "green"},
  ];
  return (
    <div className="map-container">
      <GoogleMapReact
        bootstrapURLKeys={{key: "AIzaSyDw_8Tcsd7sF5DR9d47cOesNN_aRjSWRSY"}}
        defaultCenter={center}
        defaultZoom={zoom}
        options={{
            gestureHandling: "greedy"
        }}
      >
        {stops.map((stop) => (
          <Marker key={stop.id} lat={stop.lat} lng={stop.lng} />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
