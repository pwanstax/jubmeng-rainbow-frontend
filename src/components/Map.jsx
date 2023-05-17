import React, {useEffect, useState} from "react";
import GoogleMapReact from "google-map-react";

const Marker = () => {
  const text = "A";
  const color = "red";
  return (
    <i
      className="fa-solid fa-location-dot"
      style={{position: "absolute", transform: "translate(-50%, -100%)"}}
    ></i>
  );
};

const Map = ({productList, center, setCenter}) => {
  const [stops, setStops] = useState([]);
  const [zoom, setZoom] = useState(11);

  useEffect(() => {
    const newStops = [];
    productList.map((product) => {
      const {
        location: {
          coordinates: [lng, lat],
        },
      } = product;
      newStops.push({lat, lng});
    });
    setStops(newStops);
  }, [productList]);

  useEffect(() => {
    setZoom(11 + Math.random() * 0.001);
    console.log(zoom);
  }, [center]);

  return (
    <div className="google-map-container">
      <GoogleMapReact
        bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAP_API_KEY}}
        center={center}
        // defaultZoom={11}
        zoom={zoom}
        options={{
          gestureHandling: "greedy",
        }}
      >
        {stops.map((stop, i) => (
          <Marker key={i} lat={stop.lat} lng={stop.lng} />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
