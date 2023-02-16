import React, {useState} from "react";
import ClinicCard from "../components/ClinicCard";
import FilterCheckBoxList from "../components/FilterCheckBoxList";
import SortBy from "../components/SortBy";

const ClinicPage = () => {
  const demo = {
    pet: {cat: false, dog: false, bird: true, lion: true},
    type: {clinic: true, place: false, service: false},
  };
  const demo2 = [
    {
      name: "clinic1",
      address: "testtest",
      rating: 4,
      ratingCount: 14,
      image:
        "https://www.houstonansweringservices.com/site/wp-content/uploads/2018/08/veterinarian.jpg",
    },
    {
      name: "clinic1",
      address: "testtest",
      rating: 4,
      ratingCount: 14,
      image:
        "https://www.houstonansweringservices.com/site/wp-content/uploads/2018/08/veterinarian.jpg",
    },
    {
      name: "clinic1",
      address: "testtest",
      rating: 4,
      ratingCount: 14,
      image:
        "https://www.houstonansweringservices.com/site/wp-content/uploads/2018/08/veterinarian.jpg",
    },
    {
      name: "clinic1",
      address: "testtest",
      rating: 4,
      ratingCount: 14,
      image:
        "https://www.houstonansweringservices.com/site/wp-content/uploads/2018/08/veterinarian.jpg",
    },
    {
      name: "clinic1",
      address: "testtest",
      rating: 4,
      ratingCount: 14,
      image:
        "https://www.houstonansweringservices.com/site/wp-content/uploads/2018/08/veterinarian.jpg",
    },
  ];
  const sorts = ["Highest Rating", "Most Reviews", "A to Z", "Z to A"];
  const [filterList, setFilterList] = useState(demo);
  const [clinicList, setClinicList] = useState(demo2);
  const [sortBy, setSortBy] = useState();

  return (
    <div className="clinic-page-container">
      <div className="header">
        <h1>Clinics for Pets</h1>
      </div>
      <div className="padding-box">
        <div className="content-box">
          <div className="serching-tools">
            <SortBy sorts={sorts} setSortBy={setSortBy} />
            <FilterCheckBoxList
              filterList={filterList}
              setFilterList={setFilterList}
            />
          </div>
          <div className="result-box">
            {clinicList.map((clinic, i) => {
              return <ClinicCard clinic={clinic} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicPage;
