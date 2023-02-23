import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import ProductGallery from "../components/ProductGallery";
import ProductDetailSummaryBox from "../components/ProductDetailSummaryBox";
import ProductDetailDescriptionBox from "../components/ProductDetailDescriptionBox";
import ProductDetailPriceBox from "../components/ProductDetailPriceBox";
import ProductDetailRatingBox from "../components/ProductDetailRatingBox";

const ProductDetailPage = ({name, location_description, image, tags}) => {
  const {id} = useParams();
  const demo = {
    owner: "rose",
    name: "Rose Pet Clinic",
    phones: ["038111222", "038043333"],
    social_networks: {
      facebook: "Rose Pet Clinic",
      instragram: "rose_is_vet",
      line_id: "rosepetclinic",
      twitter: "roseee",
    },
    status: "Available",
    description: "The best pet clinic in Chon Buri.",
    province: "Chon Buri",
    amphure: "Sriracha",
    tambon: "Surasak",
    location_description: "1/11, ABC Rd., Surasak, Sriracha, Chon Buri, 20110",
    latitude: "13.361143",
    longitude: "100.984673",
    tags: [
      {class: "fa-solid fa-syringe", name: "Vaccination"},
      {class: "fa-solid fa-stethoscope", name: "Health Examination"},
      {class: "fa-solid fa-neuter", name: "Spay & Neuter"},
    ],
    images: [
      "https://www.goodtimes.sc/wp-content/uploads/sites/10/2020/04/best-vet-gtw2017.jpg",
      "https://www.wealthmanagement.com/sites/wealthmanagement.com/files/veterinary-clinic.jpg",
      "https://ayutthayastation.com/wp-content/uploads/2021/05/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B8%9E%E0%B8%A2%E0%B8%B2%E0%B8%9A%E0%B8%B2%E0%B8%A5%E0%B8%AA%E0%B8%B1%E0%B8%95%E0%B8%A7%E0%B9%8C%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B8%A8%E0%B8%A3%E0%B8%B504.jpg",
      "https://www.sassymamahk.com/wp-content/uploads/2022/11/vet-clinics-hong-kong-pets-family-life-main-scaled.jpg",
      "https://myeasywireless.com/wp-content/uploads/2023/01/What-Types-of-Services-are-Offered-at-a-Free-Vet-Clinic.jpg",
    ],
    open_hours: [
      {
        day: "mon",
        periods: [
          {
            open_at: "8:00",
            close_at: "13:00",
          },
          {
            open_at: "17:00",
            close_at: "23:00",
          },
        ],
      },
      {
        day: "tue",
        periods: [
          {
            open_at: "8:00",
            close_at: "21:00",
          },
        ],
      },
      {
        day: "wed",
        periods: [
          {
            open_at: "8:00",
            close_at: "21:00",
          },
        ],
      },
      {
        day: "thu",
        periods: [
          {
            open_at: "9:00",
            close_at: "21:00",
          },
        ],
      },
      {
        day: "fri",
        periods: [
          {
            open_at: "8:00",
            close_at: "21:00",
          },
        ],
      },
    ],
    prices: [
      {name: "Feline panleukopenia virus vaccine", price: 500},
      {name: "Feline viral rhinotracheitis vaccine", price: 700},
      {name: "Feline caliciviruses vaccine", price: 900},
      {name: "Rabies virus vaccine", price: 2490},
      {name: "Feline leukemia virus (FeLV) vaccine", price: 1500},
    ],
    reviews: [
      {
        owner: "Cha Eunwoo",
        owner_img: "https://data.whicdn.com/images/334823840/original.jpg",
        review: "Good service, friendly doctor, and not expensive",
        date: "12 February 2023",
        rating: 4,
      },
      {
        owner: "Lalisa",
        owner_img:
          "https://storage.googleapis.com/k-react.appspot.com/images/profilePicture/Z0PS2szWPBVpJN3hj9mc_300x300.jpg",
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release .",
        date: "13 February 2023",
        rating: 3.5,
      },
      {
        owner: "dlwlrma",
        owner_img: "https://image.kpopmap.com/2019/02/IU-LILAC.jpg",
        review:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release .",
        date: "14 February 2023",
        rating: 2.7,
      },
    ],
    review_counts: 3,
  };

  const [detail, setDetail] = useState(demo);

  return (
    <div className="product-detail-page-container">
      <hr className="line-under-nav-bar"></hr>
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
        <ProductDetailRatingBox reviews={detail.reviews} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
