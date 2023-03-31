import axios from "axios";
import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import ProductCard from "../components/ProductCard";
import FindOnMap from "../utils/FindOnMap";

const ProductsPage = ({variant}) => {
  let headerLabel;
  switch (variant) {
    case "clinic":
      headerLabel = "Clinics for pets";
      break;
    case "service":
      headerLabel = "Services for pets";
      break;
    case "petfriendly":
      headerLabel = "Places for pets";
      break;
    default:
      headerLabel = "Clinics for pets";
  }

  const sortByOptions = {
    highest_rating: "Highest rating",
    closest_location: "Closest location",
    highest_reviews: "Highest reviews",
  };

  const [searchParams, setSearchParams] = useSearchParams();

  const [productList, setproductList] = useState([]);
  const [sortBy, setSortby] = useState(() => {
    let initialSortBy;
    if (
      searchParams.get("sort") === null ||
      !(searchParams.get("sort") in sortByOptions)
    ) {
      initialSortBy = "highest_rating";
    } else {
      initialSortBy = searchParams.get("sort");
    }
    return initialSortBy;
  });

  const [textSearch, setTextSearch] = useState(
    searchParams.get("search") ?? ""
  );

  const [defaultPets, setDefaultPets] = useState({});
  const [defaultServices, setDefaultServices] = useState({});
  const [petsSelected, setPetSelected] = useState({});
  const [servicesSelected, setServiceSelected] = useState({});

  const [showMorePets, setShowMorePets] = useState(false);
  const [showMoreServices, SetshowMoreServices] = useState(false);

  const handleOnChangePets = (event) => {
    // const {name, checked, type} = event.target;
    const {name, checked} = event.target;
    setPetSelected({...petsSelected, [name]: checked});
  };

  const handleOnChangeServices = (event) => {
    const {name, checked} = event.target;
    setServiceSelected({...servicesSelected, [name]: checked});
  };

  const handleOnChangeSortBy = (event) => {
    setSortby(event.target.value);
  };

  const handleOnChangeTextSearch = (event) => {
    setTextSearch(event.target.value);
  };

  const handleDefaultFilter = () => {
    setTextSearch("");
    setSortby("highest_rating");
    setPetSelected(defaultPets);
    setServiceSelected(defaultServices);
  };

  useEffect(() => {
    const queryToState = (query, initialState) => {
      const state = {...initialState};
      if (searchParams.get(query) !== null) {
        const keys = searchParams.get(query).split(",");
        keys.forEach((key, index) => {
          if (key in state) {
            state[key] = true;
          }
        });
      }
      return state;
    };

    const fetchTags = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/products/tags/${variant}`
        );
        const petTags = res.data.petTags.reduce(
          (a, v) => ({...a, [v]: false}),
          {}
        );
        const serviceTags = res.data.serviceTags.reduce(
          (a, v) => ({...a, [v]: false}),
          {}
        );
        setDefaultPets(petTags);
        setDefaultServices(serviceTags);
        setPetSelected(queryToState("pets", petTags));
        setServiceSelected(queryToState("services", serviceTags));
      } catch (error) {
        console.log(error);
      }
    };

    fetchTags();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const sortBy = searchParams.get("sort");
        const petTags = Object.keys(petsSelected).filter(
          (k) => petsSelected[k] === true
        );
        const serviceTags = Object.keys(servicesSelected).filter(
          (k) => servicesSelected[k] === true
        );
        const res = await axios.get(
          `http://localhost:8080/products/${variant}`,
          {
            params: {
              sort: sortBy,
              name: textSearch,
              petTags: encodeURIComponent(JSON.stringify(petTags)),
              serviceTags: encodeURIComponent(JSON.stringify(serviceTags)),
            },
          }
        );
        setproductList(res.data);
        // console.log(productList);
      } catch (error) {
        console.error(error);
      }
    };

    const stateToQuery = (state) => {
      return Object.keys(state)
        .filter((k) => state[k] === true)
        .join(",");
    };

    searchParams.set("pets", stateToQuery(petsSelected));
    searchParams.set("services", stateToQuery(servicesSelected));
    searchParams.set("search", textSearch);
    searchParams.set("sort", sortBy);
    setSearchParams(searchParams, {replace: true});
    fetchContent();
    // eslint-disable-next-line
  }, [
    sortBy,
    petsSelected,
    servicesSelected,
    textSearch,
    searchParams,
    setSearchParams,
  ]);

  // useEffect(() => {
  //   let isSubscribed = true;
  //   const fetchSaveForLater = async () => {
  //     try {
  //       const res = await axios.get(
  //         `http://localhost:8080/user/save-for-later`,
  //         {
  //           headers: {
  //             user_id: sessionStorage.getItem("user_id"),
  //           },
  //           withCredentials: true,
  //         }
  //       );
  //       const {saveForLater, count} = res.data;

  //       const saveForLaterList = saveForLater.map((product) => product._id);
  //       console.log(saveForLaterList);
  //       let productListIsSaved = productList;
  //       productListIsSaved.map((product) => ({
  //         ...product,
  //         isSaved: saveForLaterList.includes(product.id),
  //       }));
  //       // console.log(productListIsSaved);
  //       if (isSubscribed) {
  //         setproductList(productListIsSaved);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchSaveForLater();
  //   return () => {
  //     isSubscribed = false;
  //     // console.log(productList);
  //   };
  // }, [productList]);

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

  const FilterBox = ({label, list, onChange, showMore, setShowMore}) => {
    return (
      <>
        <div className="filter-box">
          <h3>{label}</h3>
          <div className="option-container">
            {Object.keys(list).map((k, i) => {
              if (i < 4 || showMore) {
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
                    <h4>{k}</h4>
                  </label>
                );
              }
              return <></>;
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
        <h1>{headerLabel}</h1>
      </div>
      <div className="content-container">
        <div className="filter-container">
          <div className="filter-box">
            <h3>Find on map</h3>
            <FindOnMap />
          </div>
          <FilterBox
            label={"Type of pets"}
            list={petsSelected}
            onChange={handleOnChangePets}
            showMore={showMorePets}
            setShowMore={setShowMorePets}
          />
          <FilterBox
            label={"Type of services"}
            list={servicesSelected}
            onChange={handleOnChangeServices}
            showMore={showMoreServices}
            setShowMore={SetshowMoreServices}
          />
        </div>
        <div className="right-container">
          <div className="search-sort-container">
            <div className="search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Text search"
                value={textSearch}
                onChange={handleOnChangeTextSearch}
              />
            </div>
            <div className="default-filter" onClick={handleDefaultFilter}>
              Set default filter
            </div>
            <label className="sort-container">
              Sort by :
              <select
                value={searchParams.get("sort")}
                onChange={handleOnChangeSortBy}
              >
                {Object.keys(sortByOptions).map((key, index) => (
                  <option value={key} key={key}>
                    {sortByOptions[key]}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <TagChips
            statesAndSetStates={[
              [petsSelected, handleOnChangePets],
              [servicesSelected, handleOnChangeServices],
            ]}
          />
          <div className="result-container">
            {productList.map((product, i) => {
              return <ProductCard product={product} key={i} type={variant} />;
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
