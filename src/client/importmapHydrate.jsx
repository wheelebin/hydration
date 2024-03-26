import * as ReactDomClient from "react-dom/client";
import React from "react";

const deserialiseItems = async (item) => {
  console.log("Deserialising: ", item);

  // If is array
  if (Array.isArray(item)) {
    return await Promise.all(item.map((child) => deserialiseItems(child)));
  }

  if (!item.type) {
    return item;
  }

  // first letter uppercase
  if (item.type[0] !== item.type[0].toUpperCase()) {
    return item;
  }

  let children = null;
  if (item.props.children) {
    // Is an array of children
    if (Array.isArray(item.props.children)) {
      children = await Promise.all(
        item.props.children.map((child) => deserialiseItems(child))
      );
    }
    // Is a single child
    else {
      children = await deserialiseItems(item.props.children);
    }
  }

  const type = await import(item.type);
  const Component = type.default;
  const props = { ...item.props, children };

  console.log("Deserialised: ", item.type, item);

  return <Component {...props} />;
};

const hydrate = async () => {
  console.log("Hydrating...");

  // Get all states
  const states = Object.entries(window)
    .map(([key, value]) => {
      if (key.startsWith("__STATE__")) {
        const [entry] = Object.entries(value);
        return entry;
      }
    })
    .filter((state) => state !== undefined);

  // Hydrate all states
  states.forEach(async (stateEntry) => {
    const [key, state] = stateEntry;
    const elem = document.getElementById(key);
    const Node = await deserialiseItems(state);

    ReactDomClient.hydrateRoot(elem, Node);
  });

  await Promise.all(states);
  console.log("Hydrated!");
};

hydrate();
