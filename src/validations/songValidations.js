import Joi from "joi";

const spotifyRgx = /^(https?:\/\/)(?:[a-z0-9-]+\.)*spotify\.com(\/.*)?$/;

const addSong = Joi.object({
  title: Joi.string().min(1).required().messages({
    "title.min": "Judul lagu minimal 1 karakter!",
    "title.required": "Judul lagu harus diisi!",
    "title.empty": "Judul lagu tidak boleh kosong!",
    "title.string": "data yang anda masukkan tidak valid!",
  }),
  artists: Joi.array().items(Joi.string().min(1)).min(1).required().messages({
    "artists.min": "Penyanyi harus diisi minimal 1 penyanyi!",
    "artists.required": "Penyanyi harus diisi!",
    "artists.empty": "Penyanyi tidak boleh kosong!",
    "artists.string": "data yang anda masukkan tidak valid!",
  }),
  url: Joi.string().pattern(spotifyRgx).required().messages({
    "url.pattern.base": "URL harus berupa URL Spotify yang valid!",
    "url.required": "URL harus diisi!",
    "url.empty": "URL tidak boleh kosong!",
    "url.string": "data yang anda masukkan tidak valid!",
  }),
});

const updateSong = Joi.object({
  id: Joi.string().length(12).required().messages({
    "id.length": "ID lagu harus sebanyak 12 karakter!",
    "id.required": "ID lagu harus diisi!",
    "id.empty": "ID lagu tidak boleh kosong!",
    "id.string": "data yang anda masukkan tidak valid!",
  }),
  title: Joi.string().min(1).messages({
    "title.min": "Judul lagu harus minimal 1 karakter!",
    "title.required": "Judul lagu harus diisi!",
    "title.empty": "Judul lagu tidak boleh kosong!",
    "title.string": "data yang anda masukkan tidak valid!",
  }),
  artists: Joi.array().items(Joi.string().min(1)).min(1).messages({
    "artists.min": "Penyanyi harus diisi minimal 1 penyanyi!",
    "artists.required": "Penyanyi harus diisi!",
    "artists.empty": "Penyanyi tidak boleh kosong!",
    "artists.string": "data yang anda masukkan tidak valid!",
  }),
  url: Joi.string().pattern(spotifyRgx).messages({
    "url.pattern.base": "URL harus berupa URL Spotify yang valid!",
    "url.required": "URL harus diisi!",
    "url.empty": "URL tidak boleh kosong!",
    "url.string": "data yang anda masukkan tidak valid!",
  }),
})
  .or("title", "artists", "url")
  .messages({
    "object.missing": "harus ada minimal 1 pembaruan!.",
  });

const getSongById = Joi.object({
  id: Joi.string().length(12).required().messages({
    "id.length": "ID lagu harus sebanyak 12 karakter!",
    "id.required": "ID lagu harus diisi!",
    "id.empty": "ID lagu tidak boleh kosong!",
    "id.string": "data yang anda masukkan tidak valid!",
  }),
});

const deleteSong = Joi.object({
  id: Joi.string().length(12).required().messages({
    "id.length": "ID lagu harus sebanyak 12 karakter!",
    "id.required": "ID lagu harus diisi!",
    "id.empty": "ID lagu tidak boleh kosong!",
    "id.string": "data yang anda masukkan tidak valid!",
  }),
});

const playSong = Joi.object({
  id: Joi.string().length(12).required().messages({
    "id.length": "ID lagu harus sebanyak 12 karakter!",
    "id.required": "ID lagu harus diisi!",
    "id.empty": "ID lagu tidak boleh kosong!",
    "id.string": "data yang anda masukkan tidak valid!",
  }),
});

export default {
  addSong,
  updateSong,
  getSongById,
  deleteSong,
  playSong,
};
