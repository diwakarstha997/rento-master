import React from "react";

const Search = ({ value, onChange, placeHolder }) => {
  return (
    <input
      type="text"
      onChange={onChange}
      name="query"
      value={value}
      placeholder={placeHolder}
      className="form-control"
    />
  );
};

export default Search;
