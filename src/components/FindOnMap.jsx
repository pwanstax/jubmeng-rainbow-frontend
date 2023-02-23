import React from "react";

const FindOnMap = () => {
  return (
    <div className="map-container">
      <button className="view-map-button">
        <i class="fa-solid fa-location-dot"></i>
        <h4>View</h4>
      </button>
      <img id="map" src="https://static.tacdn.com/img2/maps/img_map.png" />
    </div>
  );
};

export default FindOnMap;
