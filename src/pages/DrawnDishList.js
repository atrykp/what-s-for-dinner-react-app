import React, { useEffect, useState } from "react";
// tutaj otrzymuje przefiltrowaną tablicę dostosowaną do użytkownika bez potraw których nie lubi.

const DrawnDishList = ({ customedArr, banDish }) => {
  const [drawnDish, setDrawnDish] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    let date = new Date();
    setCurrentDate(date.getTime());
  }, []);

  let notYetArr;

  const handleDraw = () => {
    notYetArr = [...customedArr];
    let index = Math.floor(Math.random() * notYetArr.length);
    setDrawnDish(notYetArr[index]);
    notYetArr.slice(index, 1);
  };
  const handleShowDish = {};
  const banForADay = {};
  const ban = (id) => {
    banDish(id);
    setDrawnDish("");
  };

  const showDish = drawnDish && (
    <div className="drawnDish">
      <h1>{drawnDish.nazwa}</h1>
      <button onClick={handleShowDish}>Ok</button>
      <button onClick={banForADay}>Nie dzisiaj</button>
      <button onClick={() => ban(drawnDish.id)}>Nie lubię</button>
    </div>
  );

  return (
    <>
      <button onClick={handleDraw}>Losuj</button>
      {showDish}
    </>
  );
};

export default DrawnDishList;
