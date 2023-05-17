import axios from "axios";
import React, {useEffect, useState} from "react";
import useOutsideClick from "../hooks/useOutsideCllick";

const ProductMenu = ({
  handleSearch,
  setSearchQuery,
  searchQuery,
  petsSelected,
  setPetsSelected,
  servicesSelected,
  setServicesSelected,
  nowProvince,
  nowAmphure,
  nowTambon,
  setNowProvince,
  setNowAmphure,
  setNowTambon,
}) => {
  const [chosenPetCount, setChosenPetCount] = useState(0);
  const [chosenServiceCount, setChosenServiceCount] = useState(0);

  const [petDropdown, setPetDropdown] = useState(false);
  const [serviceDropdown, setServiceDropdown] = useState(false);
  const [areaDropdown, setAreaDropdown] = useState(false);

  const [provinces, setProvinces] = useState([]);
  const [amphures, setAmphures] = useState([]);
  const [tambons, setTambons] = useState([]);

  const ref = useOutsideClick(() => {
    setPetDropdown(false);
    setServiceDropdown(false);
    setAreaDropdown(false);
  });

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleOnChangePets = (event) => {
    const {name, checked} = event.target;
    setPetsSelected({...petsSelected, [name]: checked});
  };

  const handleOnChangeServices = (type) => (event) => {
    const {name, checked} = event.target;
    const test = {
      ...servicesSelected,
      [type]: {...servicesSelected[type], [name]: checked},
    };
    console.log(test);
    setServicesSelected({
      ...servicesSelected,
      [type]: {...servicesSelected[type], [name]: checked},
    });
  };

  const arrayFlatten = (arr) => {
    return arr.reduce(
      (a, obj) => [...a, ...Object.keys(obj).map((v) => obj[v])],
      []
    );
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
        setPetsSelected(petTags);
        setServicesSelected(serviceTags);
      } catch (error) {
        console.log(error);
      }
    };

    const getProvinces = async () => {
      try {
        const res = await axios.get(`https://ckartisan.com/api/provinces`);
        setProvinces(arrayFlatten(res.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchTags();
    getProvinces();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const countSelected = (obj) => {
      return Object.keys(obj).reduce(
        (a, tag) => a + (obj[tag] === true ? 1 : 0),
        0
      );
    };
    let serviceCount = 0;
    for (const type in servicesSelected) {
      serviceCount += countSelected(servicesSelected[type]);
    }
    setChosenPetCount(countSelected(petsSelected));
    setChosenServiceCount(serviceCount);
  }, [petsSelected, servicesSelected]);

  useEffect(() => {
    const getAmphures = async (province) => {
      const res = await axios.get(
        `https://ckartisan.com/api/amphoes?province=${province}`
      );
      setAmphures(arrayFlatten(res.data));
      setNowAmphure("");
      setTambons([]);
      setNowTambon("");
    };
    let isSubscribed = true;
    if (isSubscribed) {
      getAmphures(nowProvince);
    }
    return () => {
      isSubscribed = false;
    };
  }, [nowProvince]);

  useEffect(() => {
    const getTambons = async (province, amphure) => {
      const res = await axios.get(
        `https://ckartisan.com/api/tambons?province=${province}&amphoe=${amphure}`
      );
      setTambons(arrayFlatten(res.data));
      setNowTambon("");
    };
    let isSubscribed = true;
    if (isSubscribed) {
      getTambons(nowProvince, nowAmphure);
    }
    return () => {
      isSubscribed = false;
    };
  }, [nowAmphure]);

  return (
    <div className="product-menu-container">
      <div className="product-search">
        <input
          type="text"
          placeholder="Find your service.."
          onChange={handleChange}
        />
      </div>
      <div className="product-menu" ref={ref}>
        <div className="relative">
          <div
            className={`pet product-button ${petDropdown ? "selected" : ""}`}
            onClick={() => {
              setPetDropdown((prev) => !prev);
              setServiceDropdown(false);
              setAreaDropdown(false);
            }}
          >
            <div className="text">
              <h2>Pets&nbsp;&nbsp;&nbsp;</h2>
              <div style={{height: chosenPetCount === 0 ? "10px" : undefined}}>
                {chosenPetCount > 0 ? `· ${chosenPetCount} selected` : ""}
              </div>
            </div>
            <i className="fa-solid fa-syringe"></i>
          </div>
          {petDropdown && (
            <div className="pet dropdown-container">
              {Object.keys(petsSelected).map((pet, i) => (
                <label key={`label-${pet}-${i}`}>
                  <input
                    type="checkbox"
                    name={pet}
                    value={petsSelected[pet]}
                    checked={petsSelected[pet]}
                    onChange={handleOnChangePets}
                  />
                  <h4>{pet}</h4>
                </label>
              ))}
            </div>
          )}
        </div>

        <hr />

        <div className="relative">
          <div
            className={`service product-button ${
              serviceDropdown ? "selected" : ""
            }`}
            onClick={() => {
              setPetDropdown(false);
              setServiceDropdown((prev) => !prev);
              setAreaDropdown(false);
            }}
          >
            <div className="text">
              <h2>Services</h2>
              <div
                style={{height: chosenServiceCount === 0 ? "10px" : undefined}}
              >
                {chosenServiceCount > 0
                  ? `· ${chosenServiceCount} selected`
                  : ""}
              </div>
            </div>
            <i className="fa-solid fa-stethoscope"></i>
          </div>
          {serviceDropdown && (
            <div className="service dropdown-container">
              {Object.keys(servicesSelected).map((type, i) => (
                <React.Fragment key={i}>
                  <div className="col">
                    <h3>{type}</h3>
                    {Object.keys(servicesSelected[type]).map((service, j) => (
                      <label key={j}>
                        <input
                          type="checkbox"
                          name={service}
                          value={servicesSelected[type][service]}
                          checked={servicesSelected[type][service]}
                          onChange={handleOnChangeServices(type)}
                        />
                        <h4>{service}</h4>
                      </label>
                    ))}
                  </div>
                  {i !== 2 && <hr />}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        <hr />

        <div className="relative">
          <div
            className="area product-button"
            onClick={() => {
              setPetDropdown(false);
              setServiceDropdown(false);
              setAreaDropdown((prev) => !prev);
            }}
          >
            <div className="text">
              <h2>Area</h2>
              <div style={{height: nowProvince !== "" ? "10px" : undefined}}>
                {nowProvince !== "" ? `· selected` : ""}
              </div>
            </div>
            <i className="fa-solid fa-mountain-city"></i>
          </div>
          {areaDropdown && (
            <div className="area dropdown-container">
              <h3>Province</h3>
              <select
                className="input form-control"
                onChange={(e) => setNowProvince(e.target.value)}
                value={nowProvince}
              >
                <option value=""></option>
                {provinces.map((province, i) => (
                  <option value={province} key={i}>
                    {province}
                  </option>
                ))}
              </select>
              {nowProvince !== "" && (
                <>
                  <h3>Amphure</h3>
                  <select
                    className="input form-control"
                    onChange={(e) => setNowAmphure(e.target.value)}
                    value={nowAmphure}
                  >
                    <option value=""></option>
                    {amphures.map((amphure, i) => (
                      <option value={amphure} key={i}>
                        {amphure}
                      </option>
                    ))}
                  </select>
                </>
              )}
              {nowAmphure !== "" && (
                <>
                  <h3>Tambon</h3>
                  <select
                    className="input form-control"
                    onChange={(e) => setNowTambon(e.target.value)}
                    value={nowTambon}
                  >
                    <option value=""></option>
                    {tambons.map((tambon, i) => (
                      <option value={tambon} key={i}>
                        {tambon}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </div>
          )}
        </div>

        <hr />

        <div className="relative">
          <div onClick={() => handleSearch()} className="last product-button">
            <i
              className="search fa-solid fa-magnifying-glass"
              // onClick={handleSearchClick}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMenu;
