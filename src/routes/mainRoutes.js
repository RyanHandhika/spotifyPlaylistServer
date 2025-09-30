import express from "express";
import songRoute from "./songRoutes.js";
import userRoute from "./userRoutes.js";

const mainRoute = express.Router();

mainRoute.use("/songs", songRoute);
mainRoute.use("/users", userRoute);

export default mainRoute;
