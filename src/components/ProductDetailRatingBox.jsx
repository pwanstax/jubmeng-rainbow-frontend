import React, {useState, useEffect} from "react";
import axios from "axios";
import RenderStars from "../utils/RenderStars";

const ProductDetailRatingBox = ({type, id}) => {
  const filters = [
    {name: "Highest Rating", value: "highest_rating"},
    {name: "Lowest Rating", value: "lowest_rating"},
    {name: "Oldest", value: "oldest"},
    {name: "Newest", value: "newest"},
  ];
  const [reviews, setReviews] = useState([]);
  const [sortBy, setSortBy] = useState("highest_rating");
  const fetchCarReview = async (sort) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/review/${type}?id=${id}&sort=${sort}`
      ); // change path to backend service
      //console.log(res.data.reviews);
      setReviews(res.data.reviews);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCarReview(sortBy);
    return () => {};
  }, [sortBy]);

  const handleSorting = (event) => {
    setSortBy(event.target.value);
    //fetchCarReview(event.target.value);
  };
  return (
    <>
      {reviews.length && (
        <div className="product-detail-rating-box">
          <div className="container">
            <i class="fa-solid fa-star"></i>
            <h4>Sort By</h4>
            <select
              name="sortby"
              id="sortby"
              class="sort-by"
              onChange={handleSorting}
              defaultValue=""
            >
              {filters.map((sort) => {
                return (
                  <option key={sort.name} value={sort.value}>
                    {sort.name}
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
                    <img src={review.reviewerImg} alt="Reviewer Picture" />
                    <h4>{review.reviewer}</h4>
                    <RenderStars class="rating-star" rating={review.rating} />
                  </div>
                  <h4 className="review-paragraph">{review.comment}</h4>
                  <h4 className="review-date">{review.createdAt}</h4>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailRatingBox;
