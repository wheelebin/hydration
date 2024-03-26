import express from "express";
import ReactDomServer from "react-dom/server";
import React from "react";

import List from "./List.jsx";
import Card from "./Card.jsx";

const mockItems = [
  { name: "Item 1", id: 1 },
  { name: "Item 2", id: 2 },
  { name: "Item 3", id: 3 },
  { name: "Item 4", id: 4 },
  { name: "Item 5", id: 5 },
  { name: "Item 6", id: 6 },
  { name: "Item 7", id: 7 },
  { name: "Item 8", id: 8 },
  { name: "Item 9", id: 9 },
  { name: "Item 10", id: 10 },
];

// Simple serializer for components
const serialize = (comp) => {
  return JSON.stringify(comp, (key, value) => {
    if (key === "type" && typeof value === "function") {
      return value.name;
    }
    return value;
  });
};

const App = ({ state, children }) => {
  // Import map used by client to hydrate components
  // Dynamic imports are used to load the components and their dependencies.
  const importmap = {
    imports: {
      react: "https://esm.sh/react@18.2.0",
      "react-dom": "https://esm.sh/react-dom@18.2.0",
      "react-dom/client": "https://esm.sh/react-dom@18.2.0/client",
      Card: "http://localhost:3000/Card.js",
      List: "http://localhost:3000/List.js",
    },
  };

  return (
    <html>
      <head>
        <script
          type="importmap"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(importmap) }}
        />
        <script dangerouslySetInnerHTML={{ __html: state }} />
        <title>Card</title>
      </head>
      <body
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {children}
        <script src="importmapHydrate.js" type="module" defer />
      </body>
    </html>
  );
};

const app = express();

app.use(express.static("static"));

app.get("/", (req, res) => {
  // Create a list of Card components
  const itemElems = mockItems.map((item) => (
    <Card id={item.id} key={item.id}>
      {item.name}
    </Card>
  ));

  // Create a List component with the Card components
  const Listy = <List>{itemElems}</List>;

  // Serialize the List component, so it can be used to rehydrate the component
  // on the client.
  const state = `window.__STATE__ = ${serialize(Listy)}`;

  const markup = ReactDomServer.renderToString(
    <App state={state}>
      {/* Hydrated component need root DOM node */}
      <div id="LIST">{Listy}</div>
    </App>
  );
  res.send(markup);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
