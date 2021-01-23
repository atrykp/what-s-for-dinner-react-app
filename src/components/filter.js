import React from "react";
import "../styles/Filter.css";

const Filter = ({ filter, changeFilterActivity }) => {
  return (
    <div className={filter.active ? "filter activeFilter" : "filter"}>
      <button onClick={() => changeFilterActivity(filter.id)}>
        {filter.name}
      </button>
      <button>x</button>
    </div>
  );
};

export default Filter;
