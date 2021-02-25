import React, { useState } from "react";
import RemoveStorage from "../pages/RemoveStorage";
import { NavLink } from "react-router-dom";
import "../styles/MoreMenu.css";
const MoreMenu = () => {
  const [isActive, setIsActive] = useState(false);
  const sectionVisibility = () => {
    setIsActive((prevValue) => !prevValue);
  };
  const section = isActive && (
    <div className="moreMenu">
      <NavLink to="/bannedMeals" className="lowerNav__banned">
        {" "}
        Wstrzymane{" "}
      </NavLink>{" "}
      <RemoveStorage />
    </div>
  );
  return (
    <>
      <i className="fas fa-ellipsis-v" onClick={sectionVisibility}></i>

      {section}
    </>
  );
};

export default MoreMenu;
