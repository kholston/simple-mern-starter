import express from "express";
import path from "path";
import devBundle from "./devBundle"; // development mode only

const app = express();
const CURRENT_WORKING_DIR = process.cwd();

app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

devBundle.compile(app); // development mode only
