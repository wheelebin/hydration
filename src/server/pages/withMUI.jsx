import React from "react";
import express from "express";
import ReactDomServer from "react-dom/server";

import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import createCache from "@emotion/cache";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

import { sendHtml } from "../html";
import Shell from "../components/Shell";
import Hydrate from "../components/Hydrate";

import List from "../../shared/List";
import Card from "../../shared/Card";

import { Button, CssBaseline } from "@mui/material";
import { render } from "react-dom";

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

const isBrowser = typeof document !== "undefined";

// On the client side, Create a meta tag at the top of the <head> and set it as insertionPoint.
// This assures that Material UI styles are loaded first.
// It allows developers to easily override Material UI styles with other styling solutions, like CSS modules.
export function createEmotionCache() {
  let insertionPoint;

  if (isBrowser) {
    const emotionInsertionPoint = document.querySelector(
      'meta[name="emotion-insertion-point"]'
    );
    insertionPoint = emotionInsertionPoint ?? undefined;
  }

  return createCache({ key: "mui-style", insertionPoint });
}

export default express().get("/with-mui", (req, res) => {
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

  const content = (
    <CacheProvider value={cache}>
      <ThemeProvider
        theme={createTheme({
          palette: {
            primary: {
              main: "#556cd6",
            },
            secondary: {
              main: "#19857b",
            },
            error: {
              main: red.A400,
            },
          },
        })}
      >
        <CssBaseline />
        <Shell>
          <Button variant="contained">Hello</Button>
          <Hydrate>
            {
              <List>
                {mockItems.map((item) => (
                  <Card id={item.id} key={item.id}>
                    {item.name}
                  </Card>
                ))}
              </List>
            }
          </Hydrate>
        </Shell>
      </ThemeProvider>
    </CacheProvider>
  );

  console.log("HELLO 1");

  const html = ReactDomServer.renderToString(content);

  console.log("HELLO 2");

  const emotionChunks = extractCriticalToChunks(html);
  const emotionCss = constructStyleTagsFromChunks(emotionChunks);

  sendHtml(res, {
    content: html,
    resources: [
      // Material Icons
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />,
      <style dangerouslySetInnerHTML={{ __html: emotionCss }} />,
    ],
  });
});
