import React, {useState, useRef, useEffect} from "react";

import SlideBanner from "../components/SlideBanner";
import ServiceMenu from "../components/ServiceMenu";
import ContentSlide from "../components/ContentSlide";
import PetModalFilter from "../components/PetModalFilter";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [petInputList, setPetInputList] = useState([]);
  const ref = useRef(null);

  const contents = [
    {topic: "Now trending", icon: "paw", api: "clinic"},
    {topic: "Places-to-go", icon: "dog", api: "service"},
    {topic: "Veterinary Clinics", icon: "cat", api: "petfriendly"},
  ];

  const handleClick = () => {
    setShowModal(!showModal);
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowModal(false);
    }
  };
  console.log(ref);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  return (
    <div className="homepage-container">
      <SlideBanner />
      <ServiceMenu handleClick={handleClick} />
      <PetModalFilter
        ref={ref}
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
            />
          </div>
        );
      })}
    </div>
  );
};

export default HomePage;
