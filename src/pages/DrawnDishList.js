import React, { useEffect, useState } from "react";
// tutaj otrzymuje przefiltrowaną tablicę dostosowaną do użytkownika bez potraw których nie lubi.

const DrawnDishList = ({ customedArr }) => {
  const [drawnDish, setDrawnDish] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    let date = new Date();
    setCurrentDate(date.getTime());
  }, []);
  console.log(currentDate);

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
