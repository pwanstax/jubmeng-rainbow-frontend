import React from "react";

const ProductMenu = ({handleClick}) => {
  return (
    <div className="product-menu-container">
      <div className="product-search">
        <input type="text" placeholder="Find your service.." />
        <i class="fa-solid fa-magnifying-glass"></i>
      </div>
      <div className="product-menu">
        <div onClick={handleClick} className="product-button">
          <h2>Clinic</h2>
          <i class="fa-solid fa-syringe"></i>
        </div>
        <div onClick={handleClick} className="product-button">
          <h2>Pet Service</h2>
          <i class="fa-solid fa-stethoscope"></i>
        </div>
        <div onClick={handleClick} className="product-button">
          <h2>Friendly Place</h2>
          <i class="fa-solid fa-mountain-city"></i>
        </div>
      </div>
    </div>
  );
};

export default ProductMenu;
