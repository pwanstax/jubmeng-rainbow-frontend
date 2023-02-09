import React, {useEffect, useState, useRef} from "react";
import axios from "axios";

import SlideBanner from "../components/SlideBanner";
import ServiceMenu from "../components/ServiceMenu";
import ContentSlide from "../components/ContentSlide";

const HomePage = () => {
  const contents = [
    {topic: "Now trending", icon: "paw", api: "clinic"},
    {topic: "Places-to-go", icon: "dog", api: "service"},
    {topic: "Veterinary Clinics", icon: "cat", api: "petfriendly"},
  ];

  // useEffect(() => {
  // const fetchCars = async () => {
  //   try {
  //     const res = await axios.get(`http://localhost:8080/car`); // change path to backend service
  //     setCarList(res.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // fetchCars();
  // }, []);
  return (
    <div className="homepage-container">
      <SlideBanner />
      <ServiceMenu />
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
