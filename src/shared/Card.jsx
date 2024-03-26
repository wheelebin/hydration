import React from "react";
import MyContext from "./MyContext";

const Card = ({ id }) => {
  console.log("Hello from Card.jsx");
  const context = React.useContext(MyContext);
  const handleOnClick = () => console.log(context?.name);
  return (
    <div internalid={id}>
      <h1>A card</h1>
      <button onClick={handleOnClick}>Click me!</button>
    </div>
  );
};

export default Card;
