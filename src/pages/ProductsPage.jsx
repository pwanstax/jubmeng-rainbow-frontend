import axios from "axios";
import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import ProductCard from "../components/ProductCard";
import FindOnMap from "../utils/FindOnMap";
import ProductFilterBox from "../components/ProductFilterBox";
import TagChips from "../components/TagChips";

const ProductsPage = () => {
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
  const [petsSelected, setPetsSelected] = useState({});
  const [servicesSelected, setServicesSelected] = useState({});

  const handleOnChangePets = (event) => {
    const {name, checked} = event.target;
    setPetsSelected({...petsSelected, [name]: checked});
  };

  const handleOnChangeServices = (event) => {
    const {id, checked} = event.target;
    const [type, name] = id.split("-");
    setServicesSelected((prevState) => ({
      ...prevState,
      [type]: {...prevState[type], [name]: checked},
    }));
  };

  const handleOnChangePetTag = (event) => {
    const {value} = event.target;
    setPetsSelected({...petsSelected, [value]: false});
  };

  const handleOnChangeServiceTag = (type) => (event) => {
    const {value} = event.target;
    setServicesSelected((prevState) => ({
      ...prevState,
      [type]: {...prevState[type], [value]: false},
    }));
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
    setPetsSelected(defaultPets);
    setServicesSelected(defaultServices);
  };

  useEffect(() => {
    const arrayToObject = (array, value) => {
      return array.reduce((a, v) => ({...a, [v]: value}), {});
    };

    const fetchTags = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVICE_DOMAIN}/products/tags`
        );

        const petTags = arrayToObject(res.data.petTags, false);
        let serviceTags = {};
        Object.keys(res.data.serviceTags).map((type, i) => {
          serviceTags[type] = arrayToObject(res.data.serviceTags[type], false);
        });
        setDefaultPets(petTags);
        setDefaultServices(serviceTags);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTags();
    // eslint-disable-next-line
  }, []);

  const queryToState = (query, initialState) => {
    let state = {...initialState};
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

  useEffect(() => {
    if (Object.keys(defaultPets).length > 0) {
      setPetsSelected(queryToState("pets", defaultPets));
    }
  }, [defaultPets]);

  useEffect(() => {
    if (Object.keys(defaultServices).length > 0) {
      const initialSelected = Object.keys(defaultServices).reduce(
        (a, v) => ({...a, [v]: queryToState(v, defaultServices[v])}),
        {}
      );
      setServicesSelected(initialSelected);
    }
  }, [defaultServices]);

  useEffect(() => {
    const objectToArray = (object) => {
      return Object.keys(object).filter((key) => object[key] === true);
    };

    const fetchContent = async () => {
      try {
        const sortBy = searchParams.get("sort");
        const petTags = objectToArray(petsSelected);
        const serviceTags = Object.keys(servicesSelected).reduce(
          (a, v) => [...a, ...objectToArray(servicesSelected[v])],
          []
        );
        const res = await axios.get(
          `${process.env.REACT_APP_SERVICE_DOMAIN}/products`,
          {
            params: {
              sort: sortBy,
              name: textSearch,
              petTags: encodeURIComponent(JSON.stringify(petTags)),
              serviceTags: encodeURIComponent(JSON.stringify(serviceTags)),
            },
            headers: {
              user_id: sessionStorage.getItem("user_id"),
            },
          }
        );

        setproductList(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (Object.keys(petsSelected).length > 0) {
      searchParams.set("pets", objectToArray(petsSelected).join(","));
    }
    if (Object.keys(servicesSelected).length > 0) {
      for (const type in servicesSelected) {
        searchParams.set(type, objectToArray(servicesSelected[type]).join(","));
      }
    }
    searchParams.set("search", textSearch);
    searchParams.set("sort", sortBy);
    setSearchParams(searchParams, {replace: true});
    fetchContent();
    // eslint-disable-next-line
  }, [sortBy, petsSelected, servicesSelected, textSearch]);

  return (
    <div className="product-page-container">
      <div className="header">
        <h1>All Products</h1>
      </div>
      <div className="content-container">
        <div className="filter-container">
          <div className="filter-box">
            <h3>Find on map</h3>
            <FindOnMap />
          </div>
          <ProductFilterBox
            type={"pets"}
            list={petsSelected}
            onChange={handleOnChangePets}
          />
          {Object.keys(servicesSelected).map((key, i) => (
            <ProductFilterBox
              key={`${key}-${i}`}
              type={key}
              list={servicesSelected[key]}
              onChange={handleOnChangeServices}
            />
          ))}
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
              [petsSelected, handleOnChangePetTag],
              [servicesSelected["clinic"], handleOnChangeServiceTag("clinic")],
              [
                servicesSelected["service"],
                handleOnChangeServiceTag("service"),
              ],
              [
                servicesSelected["petfriendly"],
                handleOnChangeServiceTag("petfriendly"),
              ],
            ]}
          />
          <div className="result-container">
            {productList.map((product, i) => {
              return <ProductCard product={product} key={i} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
