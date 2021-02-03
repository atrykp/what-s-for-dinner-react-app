import React from "react";
const Dish = (props) => {
  const { name, description, ingredient, id, ban } = props.selectedDish;
  return (
    <div className="selected dish">
      <h1>{name}</h1>
      <p className="description">{description}</p>
      <div className="products">
        <h2>składniki</h2>
        <h2>Lista zakupów</h2>
      </div>
      <div className="Steps">
        <h2>Przepis</h2>
      </div>
    </div>
  );
};
export default Dish;
