import { useState } from "react";

const ProductFilterBox = ({type, list, onChange}) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <>
      <div className="filter-box">
        <h3>{type}</h3>
        <div className="option-container">
          {Object.keys(list).map((k, i) => {
            if (i < 4 || showMore) {
              return (
                <label key={`label${type}${k}`}>
                  <input
                    type="checkbox"
                    id={`${type}-${k}`}
                    name={k}
                    value={list[k]}
                    checked={list[k]}
                    onChange={onChange}
                  />
                  <h4>{k}</h4>
                </label>
              );
            }
            return <></>;
          })}
          {Object.keys(list).length > 4 && (
            <button onClick={() => setShowMore(!showMore)}>
              {showMore ? (
                <>
                  <UpIconSvg />
                  <h4>Show less</h4>
                </>
              ) : (
                <>
                  <DownIconSvg />
                  <h4>Show more</h4>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

const UpIconSvg = () => {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 0L0.669872 6L9.33013 6L5 0Z" fill="#707070" />
    </svg>
  );
};

const DownIconSvg = () => {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 6L9.33013 0H0.669873L5 6Z" fill="#707070" />
    </svg>
  );
};

export default ProductFilterBox;
