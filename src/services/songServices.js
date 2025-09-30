import data from "../data/songPlaylist.js";
import SongModel from "../models/songModels.js";

const getPlaylist = (id_user) => {
  const songs = data.filter((song) => song.id_user === id_user);

  if (songs.length === 0) {
    throw {
      code: 404,
      message:
        "Data playlist anda masih kosong, silahkan tambah terlebih dahulu!",
    };
  } else {
    return songs;
  }
};

const getSongById = (id, id_user) => {
  const song = data.find((s) => s.id === id && s.id_user === id_user);

  if (!song) {
    throw {
      code: 404,
      message: `Lagu dengan id ${id} tidak ditemukan!`,
    };
  }

  return song;
};

const playSongById = (id, id_user) => {
  const song = data.find((s) => s.id === id && s.id_user === id_user);

  if (!song) {
    throw {
      code: 404,
      message: `Lagu dengan id ${id} tidak ditemukan!`,
    };
  }
  return song;
};

const addSong = (id_user, title, artists, url) => {
  const newSong = new SongModel(id_user, title, artists, url);

  data.push(newSong);

  return newSong;
};

const updateSongById = (song, id_user) => {
  const { id, title, artists, url } = song;

  const songIndex = data.findIndex((i) => i.id === id && i.id_user === id_user);

  if (songIndex === -1) {
    throw {
      code: 404,
      message: `Lagu dengan id ${id} tidak ditemukan!`,
    };
  }

  data[songIndex].title = title || data[songIndex].title;
  data[songIndex].artists = artists || data[songIndex].artists;
  data[songIndex].url = url || data[songIndex].url;
  data[songIndex].updatedAt = new Date().toISOString();

  return data[songIndex];
};

const deleteSongById = (id, id_user) => {
  const songIndex = data.findIndex((i) => i.id === id && i.id_user === id_user);

  if (songIndex === -1) {
    throw {
      code: 404,
      message: `Lagu dengan id ${id} tidak ditemukan!`,
    };
  }

  const deleted = data.splice(songIndex, 1);

  return deleted[0];
};

export default {
  getPlaylist,
  getSongById,
  playSongById,
  addSong,
  updateSongById,
  deleteSongById,
};
