import React, {useEffect, useState} from "react";
import axios from "axios";
import HomeProductCard from "./HomeProductCard";

const ContentSlide = ({topic, icon, searchQuery}) => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/products?name=${searchQuery}`
        ); // change path to backend service
        setContents(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchContent();
  }, [searchQuery]);

  return (
    <div className="content-slide-container">
      <h1>
        <i className={`fa-solid fa-${icon}`}></i>
        {topic}
      </h1>
      <div className="cards-wrap">
        {contents.map((content, index) => {
          return (
            <HomeProductCard
              id={content.id}
              name={content.name}
              locationDescription={content.locationDescription}
              tags={content.tags}
              image={content.image}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ContentSlide;
