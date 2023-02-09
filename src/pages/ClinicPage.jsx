import React, {useState} from "react";

const ClinicPage = () => {
  const demo = {
    pet: {cat: false, dog: false, bird: true, lion: true},
    type: {clinic: true, place: false, service: false},
  };
  const [filterList, setFilterList] = useState(demo);

  return (
    <div className="clinic-page-container">
      <div className="header">
        <h1>Clinics for Pets</h1>
      </div>
      <div className="padding-box">
        <div className="content-box">
          <div className="filter-box">
            {Object.keys(filterList).map((key, index) => {
              return (
                <>
                  <div className="category-box" key={`${key}${index}`}>
                    <h3>{key}</h3>
                    
                    {Object.keys(filterList[key]).map((k, i) => {
                      return (
                        <label>
                          <input
                            type="checkbox"
                            id={`${key}${k}${i}`}
                            name={k}
                            value={k}
                            checked={filterList[key][k]}
                            //   onChange={handleOnChange}
                          />
                          {k}
                        </label>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </div>
          <div className="result-box">result</div>
        </div>
      </div>
    </div>
  );
};

export default ClinicPage;
