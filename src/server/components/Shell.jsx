import React from "react";

const Shell = ({ children }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      margin: 0,
      padding: 0,
      fontFamily: "sans-serif",
    }}
  >
    {children}
  </div>
);

export default Shell;
