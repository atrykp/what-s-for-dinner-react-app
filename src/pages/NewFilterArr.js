import React, { useState } from "react";
import "../styles/FilterArr.css";

const NewFilterArr = () => {
  const [filtersSection, setFiltersSection] = useState("false");

  const showFilterSection = () => {
    setFiltersSection((prevValue) => !prevValue);
  };
  const sectionStructure = (
    <div>
      <button>wszystkie filtry</button>
      <p>aktywne filtry:</p>
    </div>
  );
  return (
    <div className="filters">
      <button className={`filters__activeBtn }`} onClick={showFilterSection}>
        FILTRY
      </button>
      {!filtersSection && sectionStructure}
    </div>
  );
};

export default NewFilterArr;
