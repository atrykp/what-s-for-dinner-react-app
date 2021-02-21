import React, { useState } from "react";
import RemoveStorage from "../pages/RemoveStorage";
import { NavLink } from "react-router-dom";
const MoreMenu = () => {
  const [isActive, setIsActive] = useState(false);
  const sectionVisibility = () => {
    setIsActive((prevValue) => !prevValue);
  };
  const section = isActive && (
    <div className="moreMenu">
      <NavLink to="/bannedDishes" className="lowerNav__banned">
        {" "}
        Wstrzymane{" "}
      </NavLink>{" "}
      <RemoveStorage />
    </div>
  );
  return (
    <>
      <button onClick={sectionVisibility}>.</button>
      {section}
    </>
  );
};

export default MoreMenu;
