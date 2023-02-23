import React from "react";

const RenderStars = ({rating}) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
  return (
    <div className="rating-star">
      {[...Array(fullStars)].map((v, i) => (
        <i className="fa-solid fa-star fa-lg" key={`fullstar${i}`}></i>
      ))}
      {halfStar === 1 && <i className="fa-solid fa-star-half-stroke fa-lg"></i>}
      {[...Array(5 - fullStars - halfStar)].map((v, i) => (
        <i className="fa-regular fa-star fa-lg" key={`emptystar${i}`}></i>
      ))}
    </div>
  );
};

export default RenderStars;
