import React, {useState, useEffect} from "react";

import SlideBanner from "../components/SlideBanner";
import ProductMenu from "../components/ProductMenu";
import ContentSlide from "../components/ContentSlide";
import PetModalFilter from "../components/PetModalFilter";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pickService, setService] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const contents = [
    {topic: "Popular Places", icon: "paw", sort: "highest_reviews"},
    {topic: "New Arrival", icon: "dog", sort: "newest"},
    {topic: "Places near you", icon: "cat", sort: "closest_location"},
  ];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  const handleClick = (service) => {
    setShowModal(true);
    setService(service);
  };

  return (
    <div className="homepage-container">
      <SlideBanner />
      <ProductMenu
        handleClick={handleClick}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
      />
      <PetModalFilter
        pickService={pickService}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      {contents.map((content, index) => {
        return (
          <div className="content-wrap" key={index}>
            <ContentSlide
              topic={content.topic}
              icon={content.icon}
              searchQuery={content.sort}
              latitude={latitude}
              longitude={longitude}
            />
          </div>
        );
      })}
    </div>
  );
};

export default HomePage;
