import React, {useState} from "react";

import SlideBanner from "../components/SlideBanner";
import ProductMenu from "../components/ProductMenu";
import ContentSlide from "../components/ContentSlide";
import PetModalFilter from "../components/PetModalFilter";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pickService, setService] = useState("");
  const contents = [
    {topic: "Popular Place", icon: "paw"},
    {topic: "Clinic near you", icon: "dog"},
    {topic: "Place to hang out", icon: "cat"},
  ];

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
              searchQuery={searchQuery}
            />
          </div>
        );
      })}
    </div>
  );
};

export default HomePage;
