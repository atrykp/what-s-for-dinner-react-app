import React, { useState } from "react";

const UserProducts = ({ allDishes, updateUserDishes }) => {
  const [isActive, setIsActive] = useState(false);

  const showSection = () => {
    setIsActive((prevValue) => !prevValue);
  };

  return (
    <>
      <button onClick={showSection}>{isActive ? "ukryj" : "rozwiń"}</button>
    </>
  );
};

export default UserProducts;
