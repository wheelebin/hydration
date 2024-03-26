import React from "react";
import express from "express";
import ReactDomServer from "react-dom/server";

import App from "../components/App";
import Hydrate from "../components/Hydrate";

import List from "../../shared/List";
import Card from "../../shared/Card";

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

export default express().get("/", (req, res) =>
  res.send(
    ReactDomServer.renderToString(
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
    )
  )
);
