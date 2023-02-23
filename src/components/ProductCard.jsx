import {useState} from "react";

const ProductCard = ({clinic}) => {
  const {
    name,
    address,
    rating,
    ratingCount,
    services,
    price = 3,
    distance = 10,
    image = "https://images.unsplash.com/photo-1551301657-ae4d18055505?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  } = clinic;
  
  const [onHoverTags, setOnHoverTags] = useState(false);

  const TagPopup = ({services, onHoverTags}) => {
    return (
      <div className="tag-popup-box" style={{opacity: onHoverTags ? "1" : "0"}}>
        <h4>All services:</h4>
        <div className="tag-popup-grid">
          {services.map((service, i) => {
            return (
              <div className="tag-popup" key={`${service}${i}`}>
                <h4>{` ·`}</h4>
                <h4>{`${service}`}</h4>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const RenderStars = ({rating}) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
    return (
      <>
        {[...Array(fullStars)].map((v, i) => (
          <i className="fa-solid fa-star fa-lg" key={`fullstar${i}`} ></i>
        ))}
        {halfStar === 1 && <i className="fa-solid fa-star-half-stroke fa-lg"></i>}
        {[...Array(5 - fullStars - halfStar)].map((v, i) => (
          <i className="fa-regular fa-star fa-lg" key={`emptystar${i}`} ></i>
        ))}
      </>
    );
  };

  return (
    <div className="product-card">
      <img
        src={image}
        alt=""
      />
      <div className="product-info">
        <div className="title">
          <h2>{name}</h2>
          <h4>·</h4>
          <h4>{address}</h4>
        </div>
        <div className="description">
          <div className="rating-star">
            <RenderStars rating={rating} />
          </div>
          <h4>{`(${ratingCount})`}</h4>
          <h4>·</h4>
          <h4 style={{color: "green"}}>{`Open`}</h4>
          <h4>{`Until 10PM`}</h4>
          <h4>·</h4>
          <h4>{`${distance}km`}</h4>
          <h4>·</h4>
          <h4>{"$".repeat(price)}</h4>
        </div>
        <hr />
        <div className="tag-container">
          {services &&
            services.map((service, i) => {
              if (i < 3) {
                return (
                  <div className="tag" key={`${name}${service}${i}`}>
                    {/* <i class="fa-regular fa-star fa-lg"></i> */}
                    <h4>{`${service}`}</h4>
                    {i == 2 && services.length > 3 && (
                      <>
                        <h4
                          className="additional-service"
                          onMouseOver={() => setOnHoverTags(true)}
                          onMouseLeave={() => setOnHoverTags(false)}
                        >{`+ ${services.length - 3} services`}</h4>
                        {services && services.length > 3 && (
                          <div className="relative-container">
                            <TagPopup
                              services={services}
                              onHoverTags={onHoverTags}
                            />
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
  );
};
export default ProductCard;
