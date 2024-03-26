import express from "express";

import Index from "./pages/index";
import WithMUI from "./pages/withMUI";

const app = express();

app.use(express.static("static"));

app.use(Index);
app.use(WithMUI);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
