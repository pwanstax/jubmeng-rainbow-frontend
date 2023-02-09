import React from "react";

const ServiceMenu = ({handleClick}) => {
  return (
    <div className="service-menu-container">
      <div onClick={handleClick} className="service-button">
        Clinic
      </div>
      <div onClick={handleClick} className="service-button">
        Pet Service
      </div>
      <div onClick={handleClick} className="service-button">
        Friendly Place
      </div>
    </div>
  );
};

export default ServiceMenu;
