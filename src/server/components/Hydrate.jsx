import React from "react";

// Simple serializer for components
const serialize = (comp) => {
  return JSON.stringify(comp, (key, value) => {
    if (key === "type" && typeof value === "function") {
      return value.name;
    }
    return value;
  });
};

const Hydrate = ({ children }) => {
  const randomId = Math.random().toString(36).substring(7);
  const state = {
    [randomId]: children,
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__STATE__${randomId}__ = ${serialize(state)}`,
        }}
      />
      {/* Hydrated component need root DOM node */}
      <div id={randomId}>{children}</div>
    </>
  );
};

export default Hydrate;
