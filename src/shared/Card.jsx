import React from "react";
import MyContext from "./MyContext";

const Card = ({ id, children }) => {
  console.log("Hello from Card.jsx");
  const context = React.useContext(MyContext);
  const handleOnClick = () => console.log(context?.name);
  return (
    <div internalid={id}>
      <h1>{children}</h1>
      <button onClick={handleOnClick}>Click me!</button>
    </div>
  );
};

export default Card;
