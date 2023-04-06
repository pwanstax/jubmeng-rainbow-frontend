import React, {useState, useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import ProductGallery from "../components/ProductGallery";
import ProductDetailSummaryBox from "../components/ProductDetailSummaryBox";
import ProductDetailDescriptionBox from "../components/ProductDetailDescriptionBox";
import ProductDetailPriceBox from "../components/ProductDetailPriceBox";
import ProductDetailRatingBox from "../components/ProductDetailRatingBox";

const ProductDetailPage = ({name, locationDescription, image, tags}) => {
  const {id} = useParams();

  // const demo = {
  //   owner: "",
  //   name: "",
  //   phones: [],
  //   socialNetworks: {},
  //   status: "",
  //   description: "",
  //   province: "",
  //   amphure: "",
  //   tambon: "",
  //   locationDescription: "",
  //   tags: [],
  //   images: [],
  //   openHours: [],
  //   prices: [],
  //   reviews: [],
  //   reviewCounts: 0,
  // };

  const [detail, setDetail] = useState();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/product/${id}`);
        setDetail(res.data);
      } catch (error) {
        console.error(error);
        window.location.assign("/404");
      }
    };
    fetchContent();
    return () => {};
  }, []);

  return (
    <div className="product-detail-page-container">
      <hr className="line-under-nav-bar"></hr>
      {detail && (
        <div className="details">
          <div className="content-wrap">
            <ProductGallery className="gallery" imageGallery={detail.images} />
            <ProductDetailSummaryBox className="summary" detail={detail} />
          </div>
          <ProductDetailDescriptionBox
            openHours={detail.openHours}
            tags={detail.tags}
            description={detail.description}
          />

          {detail.hasOwnProperty("prices") && detail.prices.length ? (
            <ProductDetailPriceBox prices={detail.prices} />
          ) : (
            <></>
          )}
          <ProductDetailRatingBox id={id} overallRating={detail.rating} />
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
