import React, { useState } from "react";

const List = ({ children }) => {
  const [visibleItems, setVisibleItems] = useState(3);
  const handleLoadMore = () => setVisibleItems(visibleItems + 1);

  return (
    <div>
      <div style={{ display: "flex", gap: "30px", flexDirection: "column" }}>
        {children.slice(0, visibleItems)}
      </div>
      <button onClick={handleLoadMore}>Load More</button>
    </div>
  );
};

export default List;
