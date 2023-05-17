import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const MapProductView = () => {
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
  //   const handleOnChangePets = (event) => {
  //     const {name, checked} = event.target;
  //     setPetSelected({...petsSelected, [name]: checked});
  //   };
  //   const handleOnChangeServices = (event) => {
  //     const {id, checked} = event.target;
  //     const [type, name] = id.split("-");
  //     setServiceSelected((prevState) => ({
  //       ...prevState,
  //       [type]: {...prevState[type], [name]: checked},
  //     }));
  //   };
  //   const handleOnChangePetTag = (event) => {
  //     const {value} = event.target;
  //     setPetSelected({...petsSelected, [value]: false});
  //   };
  //   const handleOnChangeServiceTag = (type) => (event) => {
  //     const {value} = event.target;
  //     setServiceSelected((prevState) => ({
  //       ...prevState,
  //       [type]: {...prevState[type], [value]: false},
  //     }));
  //   };
  //   const handleOnChangeSortBy = (event) => {
  //     setSortby(event.target.value);
  //   };
  //   const handleOnChangeTextSearch = (event) => {
  //     setTextSearch(event.target.value);
  //   };
  //   const handleDefaultFilter = () => {
  //     setTextSearch("");
  //     setSortby("highest_rating");
  //     setPetSelected(defaultPets);
  //     setServiceSelected(defaultServices);
  //   };

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
        console.log(res.data);
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
    <div className="product-view-container">
      <div className="filter">FILTER</div>
      <div className="content">
        {productList.map((product, i) => {
          return (
            <div className="card">
              <ProductCard product={product} key={i} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MapProductView;
