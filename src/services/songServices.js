// import data from "../data/songPlaylist.js";
// import SongModel from "../models/songModels.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const data = prisma.song;

const getPlaylist = async (userId) => {
  console.log(userId);
  const songs = await data.findMany({
    where: {
      userId,
    },
  });

  return songs;
};

const getSongById = async (id, userId) => {
  try {
    const song = await data.findUnique({
      where: {
        id,
        userId,
      },
    });
    return song;
  } catch (error) {
    throw {
      code: 404,
      message: `Lagu dengan id ${id} tidak ditemukan!`,
    };
  }
};

const playSongById = async (id, userId) => {
  const song = await data.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!song) {
    throw {
      code: 404,
      message: `Lagu dengan id ${id} tidak ditemukan!`,
    };
  }
  return song;
};

const addSong = async (userId, title, artists, url) => {
  const newSong = await data.create({
    data: {
      userId,
      title,
      artists,
      url,
    },
  });

  return newSong;
};

const updateSongById = async (song, userId) => {
  const { id, title, artists, url } = song;

  const songSelect = await data.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!songSelect) {
    throw {
      code: 404,
      message: `Lagu dengan id ${id} tidak ditemukan!`,
    };
  }

  const updateData = data.update({
    where: {
      id,
    },
    data: {
      title: title || data[songSelect].title,
      artists: artists || data[songSelect].artists,
      url: url || data[songSelect].url,
      updatedAt: new Date().toISOString(),
    },
  });

  return updateData;
};

const deleteSongById = async (id, userId) => {
  const songIndex = await data.findFirst({
    where: {
      id,
      userId,
    },
  });

  console.log(songIndex);

  if (!songIndex) {
    throw {
      code: 404,
      message: `Lagu dengan id ${id} tidak ditemukan!`,
    };
  }

  const deleted = await data.delete({ where: { id } });

  return deleted;
};

export default {
  getPlaylist,
  getSongById,
  playSongById,
  addSong,
  updateSongById,
  deleteSongById,
};
