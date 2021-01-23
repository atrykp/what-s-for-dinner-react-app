import React from "react";
import "../styles/Filter.css";

const Filter = ({ filter }) => {
  return (
    <div className={filter.active ? "filter activeFilter" : "filter"}>
      <button>{filter.name}</button>
      <button>x</button>
    </div>
  );
};

export default Filter;
