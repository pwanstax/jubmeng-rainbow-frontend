import React from "react";
import RenderStars from "./RenderStars";

const ProductDetailRatingBox = ({reviews}) => {
  const filters = ["Highest Rating", "Lowest Rating", "Oldest", "Newest"];
  return (
    <div className="product-detail-rating-box">
      <div className="container">
        <i class="fa-solid fa-star"></i>
        <h4>Sort By</h4>
        <select
          name="sortby"
          id="sortby"
          class="sort-by"
          //onChange={}
          defaultValue=""
        >
          {filters.map((sort) => {
            return (
              <option key={sort} value={sort}>
                {sort}
              </option>
            );
          })}
        </select>
      </div>
      <div className="reviews">
        {reviews.map((review) => {
          return (
            <div className="review">
              <div className="container user">
                <img src={review.owner_img} alt="Reviewer Picture" />
                <h4>{review.owner}</h4>
                <RenderStars class="rating-star" rating={review.rating} />
              </div>
              <h4 className="review-paragraph">{review.review}</h4>
              <h4 className="review-date">{review.date}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductDetailRatingBox;
