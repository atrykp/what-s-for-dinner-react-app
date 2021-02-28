import "../styles/TypeAheadDropDown.css";
import React, { useState } from "react";

const TypeAheadDropDown = (props) => {
  const [suggestions, setSuggestions] = useState([]);

  const onTextChange = (e) => {
    const { allFiltersArr } = props;
    const arr = allFiltersArr.map((item) => item.name);

    let suggestions = [];
    const value = e.target.value;
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, `i`);
      suggestions = arr.sort().filter((v) => regex.test(v));
    }
    setSuggestions(suggestions);
    props.setFilterName(value);
  };

  const suggestionSelected = (value) => {
    setSuggestions([]);

    props.setFilterName(value);
  };

  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map((dish) => (
          <li key={dish} onClick={(e) => suggestionSelected(dish)}>
            {dish}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="TypeAheadDropDown">
      <input
        onChange={onTextChange}
        placeholder="Wpisz nazwę filtra"
        value={props.filterName}
        type="text"
      />
      {renderSuggestions()}
    </div>
  );
};

export default TypeAheadDropDown;
