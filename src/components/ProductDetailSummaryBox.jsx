import React from "react";
import FindOnMap from "../utils/FindOnMap";
import RenderStars from "../utils/RenderStars";

const ProductDetailSummaryBox = ({detail}) => {
  return (
    <div className="product-detail-summary-box">
      <h1 className="name">{detail.name}</h1>
      <div className="line">
        <RenderStars class="rating-star" rating={4} />
        <h4>{`(${detail.review_counts})`}</h4>
        <h4>·</h4>
        <h4 style={{color: "green"}}>{`Open`}</h4>
        <h4>{`Until 10PM`}</h4>
      </div>

      <div className="value">
        <i class="fa-solid fa-phone" />
        <h4 className="detail">{detail.phones.join(", ")}</h4>
      </div>
      <div className="social-networks">
        {detail.social_networks.facebook ? (
          <div className="value">
            <i class="fa-brands fa-square-facebook"></i>
            <h4 className="detail">{detail.social_networks.facebook}</h4>
          </div>
        ) : null}

        {detail.social_networks.instragram ? (
          <div className="value">
            <i class="fa-brands fa-square-instagram"></i>
            <h4 className="detail">{detail.social_networks.instragram}</h4>
          </div>
        ) : null}

        {detail.social_networks.line_id ? (
          <div className="value">
            <i class="fa-brands fa-line"></i>
            <h4 className="detail">{detail.social_networks.line_id}</h4>
          </div>
        ) : null}

        {detail.social_networks.twitter ? (
          <div className="value">
            <i class="fa-brands fa-square-twitter"></i>
            <h4 className="detail">{detail.social_networks.twitter}</h4>
          </div>
        ) : null}
      </div>
      <div className="value">
        <i class="fa-sharp fa-solid fa-location-dot"></i>
        <h4 className="detail">{detail.location_description}</h4>
      </div>
      <FindOnMap />
    </div>
  );
};

export default ProductDetailSummaryBox;
