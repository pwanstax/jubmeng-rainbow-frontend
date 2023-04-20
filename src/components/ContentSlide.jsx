import React, {useEffect, useState, useRef} from "react";
import axios from "axios";
import HomeProductCard from "./HomeProductCard";

const ContentSlide = ({topic, icon, searchQuery, latitude, longitude}) => {
  const [contents, setContents] = useState([]);
  const latestUpdateAt = useRef(null);

  useEffect(() => {
    const fetchContent = async () => {
      const updateAt = new Date();
      let params = {sort: searchQuery};
      if (latitude && longitude) {
        params.latitude = latitude;
        params.longitude = longitude;
      }
      latestUpdateAt.current = updateAt;
      try {
        const res = await axios.get(
          `http://localhost:8080/products/recommend/`,
          {
            params: params,
          }
        ); // change path to backend service
        if (latestUpdateAt.current === updateAt) {
          setContents(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchContent();
  }, [searchQuery, latitude, longitude]);

  return (
    <>
      {searchQuery == "closest_location" && (!latitude || !longitude) ? (
        <></>
      ) : (
        <div className="content-slide-container">
          <h1>
            <i className={`fa-solid fa-${icon}`}></i>
            {topic}
          </h1>
          <div className="cards-wrap">
            {contents.length > 0 && contents.map((content, index) => {
              return (
                <HomeProductCard
                  id={content.id}
                  name={content.name}
                  locationDescription={content.locationDescription}
                  tags={content.tags}
                  image={content.image}
                  distance={content.distance || null}
                  rating={content.rating}
                  reviewCounts={content.reviewCounts}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default ContentSlide;
