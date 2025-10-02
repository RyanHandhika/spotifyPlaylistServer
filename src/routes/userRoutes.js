import express from "express";
import userController from "../controllers/userControllers.js";

const userRoute = express.Router();

userRoute.get("/", userController.getUsers);
userRoute.post("/register", userController.register);
userRoute.post("/login", userController.login);

export default userRoute;
