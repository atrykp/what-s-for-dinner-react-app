import React, { useState } from "react";
import TypeAheadDropDown from "./TypeAheadDropDown";
import { useDispatch, useSelector } from "react-redux";
import { addFilter, deleteFilter, editFilter } from "../actions/actions";
import Filter from "../components/filter";
import { v4 } from "uuid";
import "../styles/FilterArr.css";

const NewFilterArr = () => {
  const dispatch = useDispatch();
  const filterStore = useSelector((state) => state.filtersReducer);
  const [filtersSection, setFiltersSection] = useState("false");
  const [allFiltersSection, setAllFiltersSection] = useState(false);
  const [filterName, setFilterName] = useState("");

  const showFilterSection = () => {
    setFiltersSection((prevValue) => !prevValue);
  };
  const findFilter = (name, arr) => {
    const newArr = arr.filter((item) => item.name === name);
    return newArr.length > 0 ? true : false;
  };
  const addNewFilter = (e) => {
    e.preventDefault();
    if (findFilter(filterName, filterStore)) {
      let element = filterStore.filter(
        (item, index) => item.name === filterName && index
      );
      if (element[0].active) {
        setFilterName("");
        return alert(
          "ten filtr już istnieje lub nazwa jest za krótka (min 2 znaki)"
        );
      }
      setFilterName("");
      return changeFilterActivity(element[0].id, element[0].active);
    }
    if (findFilter(filterName, filterStore) || filterName.length < 2) {
      setFilterName("");
      alert("ten filtr już istnieje lub nazwa jest za krótka (min 2 znaki)");
      return;
    }
    dispatch(addFilter(filterName, true));
    setFilterName("");
  };

  const showAllFilters = () => {
    setAllFiltersSection(true);
  };

  const activeFilters = () => {
    const arr = [...filterStore];
    const active = arr.filter((item) => item.active);
    const activeFiltersArr = active.map((element) => {
      return (
        <Filter
          filter={element}
          changeFilterActivity={changeFilterActivity}
          removeFilter={removeFilter}
          key={v4()}
        />
      );
    });
    return activeFiltersArr;
  };
  const showActiveFilters = () => {
    setAllFiltersSection(false);
  };

  const changeFilterActivity = (id, active) => {
    dispatch(editFilter(id, !active));
  };
  const removeFilter = (id) => {
    dispatch(deleteFilter(id));
  };

  const allFiltersArr = filterStore.map((element) => {
    return (
      <Filter
        filter={element}
        changeFilterActivity={changeFilterActivity}
        removeFilter={removeFilter}
        key={v4()}
      />
    );
  });

  const filterForm = !filtersSection && (
    <>
      <div className="filtersSectionButtons">
        {!allFiltersSection && (
          <button onClick={showAllFilters} className="filters__allFiltersBnt">
            wszystkie filtry
          </button>
        )}
        {allFiltersSection && (
          <button
            onClick={showActiveFilters}
            className="filters__activeFiltersBnt"
          >
            tylko aktywne
          </button>
        )}
      </div>
    </>
  );
  const sectionStructure = (
    <div>
      <form action="" onSubmit={addNewFilter} className="filters__addForm">
        <TypeAheadDropDown
          filterName={filterName}
          allFiltersArr={filterStore}
          setFilterName={setFilterName}
        />
        <button className="filters__addFormBtn">dodaj</button>
      </form>
    </div>
  );
  const arr = !filtersSection && (
    <div className="filterArr">
      {allFiltersSection ? allFiltersArr : activeFilters()}
    </div>
  );
  return (
    <>
      <div className="filters">
        <button
          className={`filters__activeBtn ${
            !filtersSection ? "filters__activeBtn--active" : ""
          }`}
          onClick={showFilterSection}
        >
          {`filtry ${activeFilters().length}`}
        </button>
      </div>
      {!filtersSection && sectionStructure}
      {filterForm}
      {arr}
    </>
  );
};

export default NewFilterArr;
