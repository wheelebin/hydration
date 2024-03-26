import React, { useState } from "react";
import MyContext from "./MyContext";

const List = ({ children }) => {
  const [visibleItems, setVisibleItems] = useState(3);
  const handleLoadMore = () => setVisibleItems(visibleItems + 1);

  return (
    <MyContext.Provider value={{ name: "List" }}>
      <div>
        <div style={{ display: "flex", gap: "30px", flexDirection: "column" }}>
          {children.slice(0, visibleItems)}
        </div>
        <button onClick={handleLoadMore}>Load More</button>
      </div>
    </MyContext.Provider>
  );
};

export default List;
