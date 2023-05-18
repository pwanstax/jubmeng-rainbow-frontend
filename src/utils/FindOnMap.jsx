import React from "react";
import {Link} from "react-router-dom";

const FindOnMap = () => {
  return (
    <div className="map-container">
      <Link to="/mapView" className="content">
        <button className="view-map-button">
          <i class="fa-solid fa-location-dot"></i>
          <h4>View</h4>
        </button>
      </Link>
      <img id="map" src="https://static.tacdn.com/img2/maps/img_map.png" />
    </div>
  );
};

export default FindOnMap;
