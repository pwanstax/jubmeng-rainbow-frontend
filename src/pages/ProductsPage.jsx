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
  const [petsSelected, setPetSelected] = useState({});
  const [servicesSelected, setServiceSelected] = useState({});

  const handleOnChangePets = (event) => {
    const {name, checked} = event.target;
    setPetSelected({...petsSelected, [name]: checked});
  };

  const handleOnChangeServices = (event) => {
    const {id, checked} = event.target;
    const [type, name] = id.split("-");
    setServiceSelected((prevState) => ({
      ...prevState,
      [type]: {...prevState[type], [name]: checked},
    }));
  };

  const handleOnChangePetTag = (event) => {
    const {value} = event.target;
    setPetSelected({...petsSelected, [value]: false});
  };
  
  const handleOnChangeServiceTag = (type) => (event) => {
    const {value} = event.target;
    setServiceSelected((prevState) => ({
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

    const arrayToObject = (array, value) => {
      return array.reduce((a, v) => ({...a, [v]: value}), {});
    };

    const fetchTags = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/products/tags`);

        const petTags = arrayToObject(res.data.petTags, false);
        let serviceTags = {};
        Object.keys(res.data.serviceTags).map((type, i) => {
          serviceTags[type] = arrayToObject(res.data.serviceTags[type], false);
        });
        // let serviceTags = await [
        //   ...res.data.serviceTags["clinic"],
        //   ...res.data.serviceTags["service"],
        //   ...res.data.serviceTags["petfriendly"],
        // ];
        // serviceTags = await serviceTags.reduce(
        //   (a, v) => ({...a, [v]: false}),
        //   {}
        // );
        setDefaultPets(petTags);
        setDefaultServices(serviceTags);
        setPetSelected(queryToState("pets", petTags));
        const initialSelected = Object.keys(serviceTags).reduce(
          (a, v) => ({...a, [v]: queryToState(v, serviceTags[v])}),
          {}
        );
        setServiceSelected(initialSelected);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTags();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const objectToArray = (object) => {
      return Object.keys(object).filter((key) => object[key] === true);
    };

    const fetchContent = async () => {
      try {
        const sortBy = searchParams.get("sort");
        const petTags = objectToArray(petsSelected);
        // const serviceTags = Object.keys(servicesSelected).filter(
        //   (k) => servicesSelected[k] === true
        // );
        const serviceTags = Object.keys(servicesSelected).reduce(
          (a, v) => [...a, ...objectToArray(servicesSelected[v])],
          []
        );
        const res = await axios.get(`http://localhost:8080/products`, {
          params: {
            sort: sortBy,
            name: textSearch,
            petTags: encodeURIComponent(JSON.stringify(petTags)),
            serviceTags: encodeURIComponent(JSON.stringify(serviceTags)),
          },
          headers: {
            user_id: sessionStorage.getItem("user_id"),
          },
        });

        setproductList(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    searchParams.set("pets", objectToArray(petsSelected).join(","));
    for (const type in servicesSelected) {
      searchParams.set(type, objectToArray(servicesSelected[type]).join(","));
    }
    searchParams.set("search", textSearch);
    searchParams.set("sort", sortBy);
    setSearchParams(searchParams, {replace: true});
    fetchContent();
    // eslint-disable-next-line
  }, [sortBy, petsSelected, servicesSelected, textSearch, searchParams]);

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
              [servicesSelected["service"], handleOnChangeServiceTag("service")],
              [servicesSelected["petfriendly"], handleOnChangeServiceTag("petfriendly")],
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
