import React from "react";

const ProductDetailDescriptionBox = ({open_hours, tags, description}) => {
  const days = {
    mon: "Monday",
    tue: "Tuesday",
    wed: "Wednesday",
    thu: "Thursday",
    fri: "Friday",
    sat: "Saturday",
    sun: "Sunday",
  };
  return (
    <div className="product-detail-description-box">
      <div className="container">
        <i class="fa-solid fa-clock"></i>
        <div className="open-hours">
          {open_hours.map((value) => {
            return (
              <div className="each-day">
                <div className="day-name">{days[value.day]}</div>
                <div className="periods">
                  {value.periods.map((value) => {
                    return (
                      <div className="period">
                        {value.open_at} - {value.close_at}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="tags">
        {tags.map((value) => {
          return (
            <div className="container tag">
              <i class={value.class}></i>
              <div className="tag-name">{value.name}</div>
            </div>
          );
        })}
      </div>

      <div className="container detail-description">
        <i class="fa-solid fa-book"></i>
        <div class="detail">{description}</div>
      </div>
    </div>
  );
};

export default ProductDetailDescriptionBox;
