import React from "react";

const ProductDetailPriceBox = ({prices}) => {
  return (
    <div className="product-detail-price-box">
      <i class="fa-solid fa-money-check-dollar"></i>
      <div className="prices">
        {prices.map((value) => {
          return (
            <div className="price">
              <div className="price-name">{value.service}</div>
              <div className="price-number">{value.price} Baht</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductDetailPriceBox;
