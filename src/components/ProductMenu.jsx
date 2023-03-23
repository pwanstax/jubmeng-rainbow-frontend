import React, {useState} from "react";
import {Link} from "react-router-dom";

const ProductMenu = ({handleClick, setSearchQuery, searchQuery}) => {
  const handleSearchClick = () => {
    setSearchQuery(document.querySelector(".product-search input").value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setSearchQuery(event.target.value);
    }
  };

  return (
    <div className="product-menu-container">
      <div className="product-search">
        <input
          type="text"
          placeholder="Find your service.."
          // value={searchQuery}
          // onChange={(event) => setSearchQuery(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <i
          className="fa-solid fa-magnifying-glass"
          onClick={handleSearchClick}
        ></i>
      </div>
      <div className="product-menu">
        <Link to="/clinic">
          <div onClick={handleClick} className="product-button">
            <h2>Clinic</h2>
            <i className="fa-solid fa-syringe"></i>
          </div>
        </Link>
        <Link to="/pet-service">
          <div onClick={handleClick} className="product-button">
            <h2>Pet Service</h2>
            <i className="fa-solid fa-stethoscope"></i>
          </div>
        </Link>
        <Link to="/friendly-place">
          <div onClick={handleClick} className="product-button">
            <h2>Friendly Place</h2>
            <i className="fa-solid fa-mountain-city"></i>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductMenu;
