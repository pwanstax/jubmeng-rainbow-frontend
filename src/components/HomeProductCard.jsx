import React from "react";
import {Link} from "react-router-dom";

const HomeProductCard = ({
  id,
  name,
  locationDescription,
  image,
  tags,
  reviewCounts,
  rating,
  distance,
}) => {
  const chip = {price: "$$", rating: "4.5", distance: "1.2 km"};

  return (
    <Link to={`/product/detail/${id}`}>
      <div className="card-container">
        <div className="front">
          <img src={image} alt="" />
          <div className="chips">
            <div className="chip">{chip.price}</div>
            {reviewCounts > 0 && (
              <div className="chip">
                <i class="fa-solid fa-star"></i>
                {rating.toFixed(1)}
              </div>
            )}
            {distance !== null && (
              <div className="chip">{distance.toFixed(1)} km</div>
            )}
          </div>
        </div>
        <div className="back">
          <h3>{name}</h3>
          <div>
            {tags.slice(0, Math.min(3, tags.length)).map((value, index) => {
              return (
                <div>
                  <i class={value.class}></i>
                  <span>{value.name}</span>
                </div>
              );
            })}
            <div>{tags.length > 3 && <span>...</span>}</div>
          </div>
          <span>{locationDescription}</span>
        </div>
      </div>
    </Link>
  );
};

export default HomeProductCard;
