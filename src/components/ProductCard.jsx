import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import RenderStars from "../utils/RenderStars";
const ProductCard = ({product, type}) => {
  const {
    id,
    name,
    address,
    province,
    amphure,
    tambon,
    rating,
    reviewCounts,
    tags,
    price = 3,
    distance = 10,
    openStatus,
    openStatusTimeDetail,
    image = "https://images.unsplash.com/photo-1551301657-ae4d18055505?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  } = product;

  const navigate = useNavigate();

  const [onHoverTags, setOnHoverTags] = useState(false);

  const TagPopup = ({tags, onHoverTags}) => {
    return (
      <div className="tag-popup-box" style={{opacity: onHoverTags ? "1" : "0"}}>
        <h4>All tags:</h4>
        <div className="tag-popup-grid">
          {tags.map((service, i) => {
            return (
              <div className="tag-popup" key={`${service.name}${i}`}>
                <h4>{` ·`}</h4>
                <h4>{`${service.name}`}</h4>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  console.log(product);
  return (
    <Link to={`/${type}/${id}`} className="product-link">
      <div className="product-card">
        <div className="image-container">
          <img src={image} alt="" />
        </div>
        <div className="product-info">
          <div className="description">
            <h2>{name}</h2>
            <div className="line">
              {reviewCounts === 0 ? (
                <h4>No rating</h4>
              ) : (
                <>
                  <div className="rating-star">
                    <RenderStars rating={rating} />
                  </div>
                  <h4>{`(${reviewCounts})`}</h4>
                </>
              )}
              <h4>·</h4>
              {openStatus == "Open" && (
                <>
                  <h4 style={{color: "green"}}>{openStatus}</h4>
                  <h4>Until {openStatusTimeDetail}</h4>
                </>
              )}
              {openStatus == "Closed" && (
                <>
                  <h4 style={{color: "red"}}>{openStatus}</h4>
                  <h4>Opens on {openStatusTimeDetail}</h4>
                </>
              )}
              {openStatus == "Temporary Closed" && (
                <h4 style={{color: "red"}}>{openStatus}</h4>
              )}
            </div>
            <div className="line">
              <h4>{`${province}, ${amphure}, ${tambon}`}</h4>
              <h4>·</h4>
              <h4>{`${distance}km`}</h4>
              <h4>·</h4>
              <h4>{"$".repeat(price)}</h4>
            </div>
          </div>
          <hr />
          <div className="tag-container">
            {tags &&
              tags.map((service, i) => {
                if (i < 3) {
                  return (
                    <div className="tag" key={`${name}${service.name}${i}`}>
                      {/* {<i class={service.class}></i>} */}
                      <h4>{`${service.name}`}</h4>
                      {i == 2 && tags.length > 3 && (
                        <>
                          <h4
                            className="additional-service"
                            onMouseOver={() => setOnHoverTags(true)}
                            onMouseLeave={() => setOnHoverTags(false)}
                          >{`+ ${tags.length - 3} tags`}</h4>
                          {tags && tags.length > 3 && (
                            <div className="relative-container">
                              <TagPopup tags={tags} onHoverTags={onHoverTags} />
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </Link>
  );
};
export default ProductCard;
