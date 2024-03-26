import React from "react";
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

const App = ({ children }) => {
  const scripts = [
    // Import map used by client to hydrate components
    // Dynamic imports are used to load the components and their dependencies.
    <script
      type="importmap"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(importmap) }}
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

export default App;
