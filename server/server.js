import express from "express";
import path from "path";
import mongoose from "mongoose";
import devBundle from "./devBundle"; // development mode only
import template from "./../template";

const app = express();
devBundle.compile(app); // development mode only

const CURRENT_WORKING_DIR = process.cwd();

app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

app.get("/", (req, res) => {
  res.status(200).send(template());
});

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

const db = mongoose.connection;
db.on("error", () => console.log("MongoDB connection error"));
db.once("open", () => console.log("MongoDB connected successfully"));
db.disconnect();

let port = process.env.PORT || 3000;
app.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info(`Server started on port ${port}`);
});
