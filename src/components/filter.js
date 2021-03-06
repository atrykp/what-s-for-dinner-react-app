import React from "react";
import "../styles/Filter.css";

const Filter = ({ filter, changeFilterActivity, removeFilter }) => {
  return (
    <div className={filter.active ? "filter activeFilter" : "filter"}>
      <button onClick={() => changeFilterActivity(filter.id, filter.active)}>
        {filter.name}
      </button>
      <button
        onClick={() => removeFilter(filter.id)}
        className="filter__removeBtn"
      >
        x
      </button>
    </div>
  );
};

export default Filter;
