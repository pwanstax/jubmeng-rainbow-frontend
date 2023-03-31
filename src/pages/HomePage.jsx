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
    {topic: "Popular clinics", icon: "paw", type: "clinic"},
    {topic: "Trending Services", icon: "dog", type: "service"},
    {topic: "Place to hang out", icon: "cat", type: "petfriendly"},
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
              type={content.type}
              searchQuery={searchQuery}
            />
          </div>
        );
      })}
    </div>
  );
};

export default HomePage;
