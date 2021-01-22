import React, { useState } from "react";

const DrawnDishList = ({ customedArr }) => {
  const [drawnDish, setDrawnDish] = useState("");
  let notYetArr;

  const handleDraw = () => {
    notYetArr = [...customedArr];
    let index = Math.floor(Math.random() * notYetArr.length);
    setDrawnDish(notYetArr[index]);
    notYetArr.slice(index, 1);
  };

  return (
    <>
      <button onClick={handleDraw}>Losuj</button>
      <h1>{drawnDish}</h1>
    </>
  );
};

export default DrawnDishList;
