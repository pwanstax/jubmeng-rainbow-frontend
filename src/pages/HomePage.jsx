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
    {topic: "Now trending", icon: "paw", api: "clinic"},
    {topic: "Places-to-go", icon: "dog", api: "service"},
    {topic: "Veterinary Clinics", icon: "cat", api: "petfriendly"},
  ];

  const handleClick = () => {
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
      {contents.map((content) => {
        return (
          <div className="content-wrap">
            <ContentSlide
              topic={content.topic}
              icon={content.icon}
              api={content.api}
              searchQuery={searchQuery}
            />
          </div>
        );
      })}
    </div>
  );
};

export default HomePage;
