import React from "react";

const SortBy = ({sorts, setSortBy}) => {
  const handleChange = (event) => {
    const {value} = event.target;
    setSortBy(value);
  };
  return (
    <div>
      <option disabled hidden></option>
      <div class="sort-by">
        <h3>Sort By</h3>
        <select
          name="sortby"
          id="sortby"
          onChange={handleChange}
          defaultValue=""
        >
          {sorts.map((sort) => {
            return (
              <option key={sort} value={sort}>
                {sort}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default SortBy;
