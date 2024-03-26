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

export const getImportMap = () => importmap;
