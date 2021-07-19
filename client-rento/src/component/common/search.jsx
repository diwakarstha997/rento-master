import React from "react";

const Search = ({ value, onChange }) => {
  return (
    <input
      type="text"
      onChange={onChange}
      name="query"
      value={value}
      placeholder="Enter Location"
      className="form-control"
    />
  );
};

export default Search;
