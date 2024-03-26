import React from "react";

const Card = ({ id }) => {
  console.log("Hello from Card.jsx");
  return (
    <div internalid={id}>
      <h1>A card</h1>
    </div>
  );
};

export default Card;
