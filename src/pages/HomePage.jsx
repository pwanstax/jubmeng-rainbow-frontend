import React, {useState} from "react";

import SlideBanner from "../components/SlideBanner";
import ProductMenu from "../components/ProductMenu";
import ContentSlide from "../components/ContentSlide";
import PetModalFilter from "../components/PetModalFilter";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [petInputList, setPetInputList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const contents = [
    {topic: "Now trending", icon: "paw", type: "clinic"},
    {topic: "Places-to-go", icon: "dog", type: "service"},
    {topic: "Veterinary Clinics", icon: "cat", type: "petfriendly"},
  ];

  const handleClick = (event) => {
    setShowModal(!showModal);
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
        showModal={showModal}
        setShowModal={setShowModal}
        petInputList={petInputList}
        setPetInputList={setPetInputList}
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
