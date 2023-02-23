import React, {useState} from "react";

const ProductGallery = ({imageGallery}) => {
  const [currentImage, setCurrentImage] = useState(imageGallery[0]);

  const handleClick = (image) => {
    setCurrentImage(image);
  };

  return (
    <div className="product-gallery">
      <div>
        <div className="main-view">
          <img src={currentImage} alt="product" />
        </div>
        <div className="other-view">
          {imageGallery.map((product, index) => {
            return (
              <div key={index} onClick={() => handleClick(product)}>
                <img src={product} alt="product" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
