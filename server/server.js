import express from "express";
import path from "path";
import devBundle from "./devBundle"; // development mode only
import template from "./../template";

const app = express();
devBundle.compile(app); // development mode only

const CURRENT_WORKING_DIR = process.cwd();

app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

app.get("/", (req, res) => {
  res.status(200).send(template());
});

let port = process.env.PORT || 3000;
app.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info(`Server started on port ${port}`);
});
