import React from "react";

const SearchBar = ({ input: keyword, onChange: setKeyword }) => {
  const BarStyling = {
    background: "white",
    border: "10px",
    padding: "rem",
  };
  return (
    <input
      style={BarStyling}
      className="w-100"
      key="random1"
      value={keyword}
      placeholder="Search"
      onChange={(e) => setKeyword(e.target.value)}
    />
  );
};

export default SearchBar;
