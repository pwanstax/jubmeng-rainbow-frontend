import React from "react";
import FindOnMap from "../utils/FindOnMap";
import RenderStars from "../utils/RenderStars";

const ProductDetailSummaryBox = ({detail}) => {
  return (
    <div className="product-detail-summary-box">
      <h1 className="name">{detail.name}</h1>
      <div className="line">
        <RenderStars class="rating-star" rating={detail.rating} />
        <h4>{`(${detail.reviewCounts})`}</h4>
        <h4>·</h4>
        {detail.openStatus == "Open" && (
          <>
            <h4 style={{color: "green"}}>{detail.openStatus}</h4>
            <h4>Until {detail.openStatusTimeDetail}</h4>
          </>
        )}
        {detail.openStatus == "Closed" && (
          <>
            <h4 style={{color: "red"}}>{detail.openStatus}</h4>
            <h4>Opens on {detail.openStatusTimeDetail}</h4>
          </>
        )}
        {detail.openStatus == "Temporary Closed" && (
          <h4 style={{color: "red"}}>{detail.openStatus}</h4>
        )}
      </div>

      <div className="value">
        <i class="fa-solid fa-phone" />
        <h4 className="detail">{detail.phones.join(", ")}</h4>
      </div>
      <div className="social-networks">
        {detail.socialNetworks.facebook ? (
          <div className="value">
            <i class="fa-brands fa-square-facebook"></i>
            <h4 className="detail">{detail.socialNetworks.facebook}</h4>
          </div>
        ) : null}

        {detail.socialNetworks.instragram ? (
          <div className="value">
            <i class="fa-brands fa-square-instagram"></i>
            <h4 className="detail">{detail.socialNetworks.instragram}</h4>
          </div>
        ) : null}

        {detail.socialNetworks.lineID ? (
          <div className="value">
            <i class="fa-brands fa-line"></i>
            <h4 className="detail">{detail.socialNetworks.lineID}</h4>
          </div>
        ) : null}

        {detail.socialNetworks.twitter ? (
          <div className="value">
            <i class="fa-brands fa-square-twitter"></i>
            <h4 className="detail">{detail.socialNetworks.twitter}</h4>
          </div>
        ) : null}
      </div>
      <div className="value">
        <i class="fa-sharp fa-solid fa-location-dot"></i>
        <h4 className="detail">{detail.locationDescription}</h4>
      </div>
      <FindOnMap />
    </div>
  );
};

export default ProductDetailSummaryBox;
