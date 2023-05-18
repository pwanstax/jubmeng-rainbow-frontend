import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const MapProductView = ({productList, setCenter}) => {
  return (
    <div className="product-view-container">
      {/* <div className="filter">FILTER</div> */}
      <div className="content">
        {productList.map((product, i) => {
          return (
            <div className="card">
              <ProductCard product={product} key={i} mapIcon setCenter={setCenter} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MapProductView;
