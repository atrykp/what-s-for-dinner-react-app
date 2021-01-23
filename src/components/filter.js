import React from "react";

const Filter = ({ filter }) => {
  return (
    <div className="filter">
      <button>{filter.name}</button>
      <button>x</button>
    </div>
  );
};

export default Filter;
