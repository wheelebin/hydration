import express from "express";
import ReactDomServer from "react-dom/server";
import React from "react";

import List from "../shared/List.jsx";
import Card from "../shared/Card.jsx";

import { getImportMap } from "./importmap.js";

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
  const scripts = [
    // Import map used by client to hydrate components
    // Dynamic imports are used to load the components and their dependencies.
    <script
      type="importmap"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getImportMap()) }}
    />,

    // Client script that hydrates the components
    <script src="client/importmapHydrate.js" type="module" defer />,
  ];

  return (
    <html>
      <head>
        {...scripts}
        <title>App</title>
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
      </body>
    </html>
  );
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

const app = express();

app.use(express.static("static"));

app.get("/", (req, res) => {
  const markup = ReactDomServer.renderToString(
    <App>
      <Hydrate>
        <List>
          {mockItems.map((item) => (
            <Card id={item.id} key={item.id}>
              {item.name}
            </Card>
          ))}
        </List>
      </Hydrate>

      <h1>The bellow is not hydrated!</h1>
      <h3>Since it's not wrapped in the hydrate tag.</h3>
      <List>
        {mockItems.map((item) => (
          <Card id={item.id} key={item.id}>
            {item.name}
          </Card>
        ))}
      </List>
    </App>
  );
  res.send(markup);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
