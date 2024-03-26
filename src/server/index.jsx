import express from "express";

import Index from "./pages/index";

const app = express();

app.use(express.static("static"));

app.use(Index);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
