import React, {useState, useEffect} from "react";

import SlideBanner from "../components/SlideBanner";
import ProductMenu from "../components/ProductMenu";
import ContentSlide from "../components/ContentSlide";
import PetModalFilter from "../components/PetModalFilter";
import { useNavigate } from "react-router-dom";

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
  const [petsSelected, setPetsSelected] = useState({});
  const [servicesSelected, setServicesSelected] = useState({});
  const [nowProvince, setNowProvince] = useState("");
  const [nowAmphure, setNowAmphure] = useState("");
  const [nowTambon, setNowTambon] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  const handleSearch = () => {
    const objectToArray = (object) => {
      return Object.keys(object).filter((key) => object[key] === true);
    };

    const petsString = objectToArray(petsSelected).join("%2C");

    const tagsString = Object.keys(servicesSelected).reduce(
      (a, type) => [...a, objectToArray(servicesSelected[type]).join("%2C")],
      []
    );
    const navi = `/product?pets=${petsString}&search=${searchQuery}&sort=highest_rating&clinic=${tagsString[0]}&service=${tagsString[1]}&petfriendly=${tagsString[2]}`;
    navigate(navi);
  };

  return (
    <div className="homepage-container">
      <SlideBanner />
      <ProductMenu
        handleSearch={handleSearch}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        petsSelected={petsSelected}
        setPetsSelected={setPetsSelected}
        servicesSelected={servicesSelected}
        setServicesSelected={setServicesSelected}
        nowProvince={nowProvince}
        setNowProvince={setNowProvince}
        nowAmphure={nowAmphure}
        setNowAmphure={setNowAmphure}
        nowTambon={nowTambon}
        setNowTambon={setNowTambon}
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
