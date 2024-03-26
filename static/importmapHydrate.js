import * as ReactDomClient from "react-dom/client";
import React from "react";
const deserialiseItems = async (item) => {
  if (Array.isArray(item)) {
    return await Promise.all(item.map((child) => deserialiseItems(child)));
  }
  if (!item.type) {
    return item;
  }
  if (item.type[0] !== item.type[0].toUpperCase()) {
    return item;
  }
  let children = null;
  if (item.props.children) {
    if (Array.isArray(item.props.children)) {
      children = await Promise.all(
        item.props.children.map((child) => deserialiseItems(child))
      );
    } else {
      children = await deserialiseItems(item.props.children);
    }
  }
  const type = await import(item.type);
  const Component = type.default;
  const props = { ...item.props, children };
  return /* @__PURE__ */ React.createElement(Component, { ...props });
};
const hydrate = async () => {
  const elem = document.getElementById("LIST");
  const Node = await deserialiseItems(window.__STATE__);
  ReactDomClient.hydrateRoot(elem, Node);
};
hydrate();
