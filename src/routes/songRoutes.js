import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import songController from "../controllers/songControllers.js";

const songRoute = express.Router();
songRoute.use(authMiddleware);

songRoute.get("", songController.getPlaylist);
songRoute.get("/:id", songController.getSongById);
songRoute.get("/:id/play", songController.playSongById);
songRoute.post("", songController.addSong);
songRoute.patch("/:id", songController.updateSongById);
songRoute.delete("/:id", songController.deleteSongById);

export default songRoute;
