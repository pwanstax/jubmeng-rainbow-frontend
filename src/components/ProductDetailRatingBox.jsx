import React, {useState, useEffect} from "react";
import axios from "axios";
import RenderStars from "../utils/RenderStars";

const ProductDetailRatingBox = ({id, overallRating}) => {
  const filters = [
    {name: "Newest", value: "newest"},
    {name: "Oldest", value: "oldest"},
    {name: "Highest Rating", value: "highest_rating"},
    {name: "Lowest Rating", value: "lowest_rating"},
  ];
  const [reviews, setReviews] = useState([]);
  const [ratingCount, setRatingCount] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [toggleAddReview, setToggleAddReview] = useState(false);
  const [addedRating, setAddedRating] = useState(5);
  const [addedComment, setAddedComment] = useState("");

  const RenderInputStars = ({rating}) => {
    const fullStars = Math.floor(rating);
    let cnt = 0;
    return (
      <div className="rating-star">
        {[...Array(fullStars)].map((v, i) => {
          cnt += 1;
          return (
            <button
              className="fa-solid fa-star fa-lg star-btn"
              onClick={changeRating}
              name={`rating${cnt}`}
              key={`fullstar${i}`}
            ></button>
          );
        })}
        {[...Array(5 - fullStars)].map((v, i) => {
          cnt += 1;
          return (
            <button
              className="fa-regular fa-star fa-lg star-btn"
              onClick={changeRating}
              name={`rating${cnt}`}
              key={`emptystar${i}`}
            ></button>
          );
        })}
      </div>
    );
  };
  const changeRating = (event) => {
    const name = event.target.name;
    const rating = parseInt(name.slice(-1));
    setAddedRating(rating);
  };
  const changeComment = (event) => {
    const {value} = event.target;
    setAddedComment(value);
  };

  const RatingCountBar = ({ratingCount}) => {
    let ratings = [0, 0, 0, 0, 0, 0];
    for (const e of ratingCount) {
      ratings[e.rating] = e.count;
    }

    //const totalRatings = ratings.reduce((total, count) => total + count, 0);
    const maxCount = Math.max(...ratings);

    return (
      <div className="rating-count-bar">
        {[...Array(5)].map((_, idx) => {
          const index = 5 - idx;
          const ratingCount = ratings[index] || 0;
          //const ratingPercentage = (ratingCount / totalRatings) * 100 || 0;
          const barWidth = (ratingCount / maxCount) * 100 || 0;
          return (
            <div key={index} className="rating-bar">
              <span className="rating-label">{index}</span>
              <div className="bar-container">
                <div className="bar" style={{width: `${barWidth}%`}}></div>
              </div>
              {/* <span className="rating-count">{ratingCount}</span> */}
              {/* <span className="rating-percentage">{`${ratingPercentage.toFixed(
                1
              )}%`}</span> */}
            </div>
          );
        })}
      </div>
    );
  };

  const fetchCarReview = async (sort) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/review/${id}?sort=${sort}`
      ); // change path to backend service
      setReviews(res.data.reviews);
      setRatingCount(res.data.ratingCount);
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
  const openAddReview = (event) => {
    setToggleAddReview(!toggleAddReview);
  };
  const cancelAddReview = (event) => {
    setToggleAddReview(false);
    setAddedComment("");
    setAddedRating(5);
  };
  const handleSaveAddedReview = async (event) => {
    const sendData = {
      review: {
        reviewerID: sessionStorage.getItem("user_id"),
        productID: id,
        comment: addedComment,
        rating: addedRating,
      },
    };
    try {
      await axios.post("http://localhost:8080/review", sendData, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };
  return (
    <>
      {(sessionStorage.getItem("user_id") !== null || reviews.length > 0) && (
        <div className="product-detail-rating-box">
          {reviews.length > 0 && (
            <div className="rating-summary">
              <i class="fa-solid fa-star label-icon"></i>
              <RatingCountBar ratingCount={ratingCount} />
              <div className="summary">
                <h1 className="overall-rating">{overallRating.toFixed(2)}</h1>
                <h4>{reviews.length} reviews</h4>
              </div>
            </div>
          )}

          <div className="container">
            {reviews.length > 0 && (
              <>
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
              </>
            )}
            {sessionStorage.getItem("user_id") !== null && (
              <>
                {reviews.length === 0 && (
                  <i class="fa-solid fa-star label-icon"></i>
                )}
                <button
                  className="btn add-review-btn"
                  onClick={openAddReview}
                  style={{"margin-left": reviews.length > 0 ? "auto" : "0"}}
                >
                  <i class="fa-regular fa-comment"></i> <h4> Write a review</h4>
                </button>
              </>
            )}
          </div>
          {toggleAddReview && (
            <div className="add-review">
              <div className="flex-column">
                <label>Rating</label>
                <RenderInputStars
                  class="rating-star"
                  type="service"
                  rating={addedRating}
                />
              </div>
              <div className="flex-column comment">
                <label>Comment</label>
                <textarea name="comment" onChange={changeComment}></textarea>
              </div>
              <div className="flex-column control-btn">
                <button className="btn cancel" onClick={cancelAddReview}>
                  <h4>Cancel</h4>
                </button>
                <button className="btn save" onClick={handleSaveAddedReview}>
                  <h4>Save</h4>
                </button>
              </div>
            </div>
          )}
          {reviews.length > 0 && (
            <div className="reviews">
              {reviews.map((review) => {
                return (
                  <div className="review">
                    <div className="container user">
                      <img src={review.reviewerImg} alt="Reviewer" />
                      <h4>{review.reviewer}</h4>
                      <RenderStars class="rating-star" rating={review.rating} />
                    </div>
                    <h4 className="review-paragraph">{review.comment}</h4>
                    <h4 className="review-date">{review.createdAt}</h4>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProductDetailRatingBox;
