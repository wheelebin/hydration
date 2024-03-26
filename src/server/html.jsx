import React from "react";
import ReactDOMServer from "react-dom/server";
import { glob } from "glob";

const importmap = {
  imports: {
    react: "https://esm.sh/react@18.2.0",
    "react-dom": "https://esm.sh/react-dom@18.2.0",
    "react-dom/client": "https://esm.sh/react-dom@18.2.0/client",
  },
};

glob.sync("src/shared/*.jsx").forEach((file) => {
  const name = file.split("/").pop().replace(".jsx", "");
  importmap.imports[name] = `http://localhost:3000/shared/${name}.js`;
});

export const html = ({ content, resources = [] }) => {
  const hydrationResources = [
    // Import map used by client to hydrate components
    // Dynamic imports are used to load the components and their dependencies.
    <script
      type="importmap"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(importmap) }}
    />,

    // Client script that hydrates the components
    <script src="client/importmapHydrate.js" type="module" defer />,
  ];

  const resourcesHtml = ReactDOMServer.renderToString([
    ...hydrationResources,
    ...resources,
  ]);

  return `
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <!-- Resources -->
        ${resourcesHtml}

        <title>App</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>`;
};

export const sendHtml = (res, { content, resources }) => {
  res.send(html({ content, resources }));
};
