import express from "express";
import devBundle from "./devBundle"; // development mode only

const app = express();
devBundle.compile(app); // development mode only
