const FilterCheckBoxList = ({filterList, setFilterList}) => {
  const handleOnChange = (event) => {
    const {name, checked} = event.target;
    const names = name.split("_");
    console.log(name, checked);
    setFilterList((prevState) => ({
      ...prevState,
      [names[0]]: {...prevState[names[0]], [names[1]]: checked},
    }));
  };
  return (
    <div className="filter-checkbox-list">
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
                      name={`${key}_${k}`}
                      value={true}
                      checked={filterList[key][k]}
                      onChange={handleOnChange}
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
  );
};
export default FilterCheckBoxList;
