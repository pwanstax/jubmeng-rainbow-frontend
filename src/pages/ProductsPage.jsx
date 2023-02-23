import React, {useState} from "react";
import ProductCard from "../components/ProductCard";

const ProductsPage = () => {
  const demo2 = [
    {
      name: "Cat Clinic1",
      address: "Bangsuan, Mueng, Chon Buri",
      rating: 4,
      ratingCount: 14,
      services: [
        "Vaccination",
        "Health Examination",
        "Spay & Neuter",
        "Spay & Neuter",
      ],
      image:
        "https://www.houstonansweringservices.com/site/wp-content/uploads/2018/08/veterinarian.jpg",
      price: 3,
    },
    {
      name: "clinic1",
      address: "Bangsuan, Mueng, Chon Buri",
      rating: 2.7,
      ratingCount: 14,
      services: [
        "Vaccination",
        "Health Examination",
        "Vaccination",
        "Vaccination",
        "Vaccination",
        "Vaccination",
      ],
      price: 3,
    },
    {
      name: "clinic2",
      address: "Bangsuan, Mueng, Chon Buri",
      rating: 0,
      ratingCount: 14,
      services: ["Vaccination", "Health Examination", "Spay & Neuter"],
      image:
        "https://www.houstonansweringservices.com/site/wp-content/uploads/2018/08/veterinarian.jpg",
      price: 3,
    },
  ];

  const services = [
    "Veterinary",
    "Outpatient Service",
    "Vaccination",
    "Spay and Neuter",
    "Dental Care",
    "Health Examination",
    "Microchipping",
    "Surgery",
    "Mass Removal",
    "Physiotherapy",
    "Online Veterinary",
    "Housecall Vet",
    "Cat-friendly Clinic",
    "Chinese Medicine",
    "Acupuncture",
  ];

  const animals = ["cat", "dog", "bird", "lion", "fish", "tiger"];

  const sortByOptions = [
    {label: "Highest rating", value: "Highest rating"},
    {label: "Closest location", value: "Closest location"},
    {label: "Higest reviews", value: "Higest reviews"},
  ];

  const servicesDict = services.reduce((a, v) => ({...a, [v]: false}), {});

  const animalsDict = animals.reduce((a, v) => ({...a, [v]: false}), {});

  const [clinicList, setClinicList] = useState(demo2);
  const [sortBy, setSortby] = useState("Highest rating");

  const [petsSelected, setPetSelected] = useState(animalsDict);
  const [showMorePets, setShowMorePets] = useState(false);
  const [serviceSelected, setServiceSelected] = useState(servicesDict);
  const [showMoreServices, SetshowMoreServices] = useState(false);

  const handleOnChangePets = (event) => {
    const {name, checked, type} = event.target;
    setPetSelected({...petsSelected, [name]: checked});
  };

  const handleOnChangeServices = (event) => {
    const {name, checked} = event.target;
    setServiceSelected({...serviceSelected, [name]: checked});
  };

  const handleOnChangeSort = (event) => {
    setSortby(event.target.value);
  };

  const handleDefaultFilter = () => {
    setSortby("Highest rating");
    setPetSelected(animalsDict);
    setServiceSelected(servicesDict);
  };

  const TagChips = ({statesAndSetStates}) => {
    return (
      <div className="tags-chip-container">
        {statesAndSetStates.map(([state, setState]) => {
          return Object.keys(state).map((name, i) => {
            return (
              state[name] && (
                <button
                  className="tag-chip"
                  key={`tag-chip-${name}`}
                  name={name}
                  onClick={setState}
                >
                  <span class="pointer-events-none">
                    {name}&nbsp;
                    <i class="fa-solid fa-xmark"></i>
                  </span>
                </button>
              )
            );
          });
        })}
      </div>
    );
  };

  const FindOnMap = () => {
    return (
      <div className="filter-box">
        <h3>Find on map</h3>
        <div className="map-container">
          <button className="view-map-button">
            <i class="fa-solid fa-location-dot"></i>
            <h4>View</h4>
          </button>
          <img id="map" src="https://static.tacdn.com/img2/maps/img_map.png" />
        </div>
      </div>
    );
  };

  const FilterBox = ({label, list, onChange, showMore, setShowMore}) => {
    return (
      <>
        <div className="filter-box">
          <h3>{label}</h3>
          <div className="option-container">
            {Object.keys(list).map((k, i) => {
              if (i < 4 || showMore)
                return (
                  <label key={`label${label}${k}`}>
                    <input
                      type="checkbox"
                      id={`checkbox${label}${k}`}
                      name={k}
                      value={list[k]}
                      checked={list[k]}
                      onChange={onChange}
                    />
                    &nbsp;{k}
                  </label>
                );
            })}
            {Object.keys(list).length > 4 && (
              <button onClick={() => setShowMore(!showMore)}>
                {showMore ? (
                  <>
                    <UpIconSvg />
                    <h4>Show less</h4>
                  </>
                ) : (
                  <>
                    <DownIconSvg />
                    <h4>Show more</h4>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="product-page-container">
      <div className="header">
        <h1>Clinics for Pets</h1>
      </div>
      <div className="content-container">
        <div className="filter-container">
          <FindOnMap />
          <FilterBox
            label={"Type of pets"}
            list={petsSelected}
            onChange={handleOnChangePets}
            showMore={showMorePets}
            setShowMore={setShowMorePets}
          />
          <FilterBox
            label={"Type of services"}
            list={serviceSelected}
            onChange={handleOnChangeServices}
            showMore={showMoreServices}
            setShowMore={SetshowMoreServices}
          />
        </div>
        <div className="right-container">
          <div className="search-sort-container">
            <div className="search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="Text search" />
            </div>
            <div className="default-filter" onClick={handleDefaultFilter}>Set default filter</div>
            <label className="sort-container">
              Sort by :
              <select value={sortBy} onChange={handleOnChangeSort}>
                {sortByOptions.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <TagChips
            statesAndSetStates={[
              [petsSelected, handleOnChangePets],
              [serviceSelected, handleOnChangeServices],
            ]}
          />
          <div className="result-container">
            {clinicList.map((clinic, i) => {
              return <ProductCard clinic={clinic} key={i} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const UpIconSvg = () => {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 0L0.669872 6L9.33013 6L5 0Z" fill="#707070" />
    </svg>
  );
};

const DownIconSvg = () => {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 6L9.33013 0H0.669873L5 6Z" fill="#707070" />
    </svg>
  );
};

export default ProductsPage;
