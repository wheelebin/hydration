import React, { useState } from "react";
const List = ({ children }) => {
  const [visibleItems, setVisibleItems] = useState(3);
  const handleLoadMore = () => setVisibleItems(visibleItems + 1);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: "30px", flexDirection: "column" } }, children.slice(0, visibleItems)), /* @__PURE__ */ React.createElement("button", { onClick: handleLoadMore }, "Load More"));
};
var List_default = List;
export {
  List_default as default
};
