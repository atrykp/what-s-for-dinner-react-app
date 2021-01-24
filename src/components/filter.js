import React from "react";
import "../styles/Filter.css";

const Filter = ({ filter, changeFilterActivity, removeFilter }) => {
  return (
    <div className={filter.active ? "filter activeFilter" : "filter"}>
      <button onClick={() => changeFilterActivity(filter.id)}>
        {filter.name}
      </button>
      <button onClick={() => removeFilter(filter.id)}>x</button>
    </div>
  );
};

export default Filter;
