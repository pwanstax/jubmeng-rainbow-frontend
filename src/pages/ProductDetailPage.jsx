import React, {useState, useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import ProductGallery from "../components/ProductGallery";
import ProductDetailSummaryBox from "../components/ProductDetailSummaryBox";
import ProductDetailDescriptionBox from "../components/ProductDetailDescriptionBox";
import ProductDetailPriceBox from "../components/ProductDetailPriceBox";
import ProductDetailRatingBox from "../components/ProductDetailRatingBox";

const ProductDetailPage = ({name, location_description, image, tags}) => {
  const {type, id} = useParams();
  // const demo = {
  //   owner: "",
  //   name: "",
  //   phones: [],
  //   social_networks: {},
  //   status: "",
  //   description: "",
  //   province: "",
  //   amphure: "",
  //   tambon: "",
  //   location_description: "",
  //   tags: [],
  //   images: [],
  //   open_hours: [],
  //   prices: [],
  //   reviews: [],
  //   review_counts: 0,
  // };

  const [detail, setDetail] = useState();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/product/${type}/${id}`
        );
        //console.log(res.data);
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
            open_hours={detail.open_hours}
            tags={detail.tags}
            description={detail.description}
          />
          <ProductDetailPriceBox prices={detail.prices} />
          {<ProductDetailRatingBox type={type} id={id} />}
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
