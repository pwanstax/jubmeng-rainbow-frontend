import React from "react";

const ServiceDetailPage = ({name, location_description, image, tags}) => {
  return (
    <div className="card-container">
      <img src={image} alt="" className="front" />
      <div className="back">
        <h1>{name}</h1>
        <p>
          <i class="fa-solid fa-location-dot"></i> {location_description}
        </p>
        <div>
          {tags.map((tag) => {
            return <div>{tag}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
