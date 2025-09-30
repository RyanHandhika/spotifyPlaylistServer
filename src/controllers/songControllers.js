import songService from "../services/songServices.js";
import songSchema from "../validations/songValidations.js";

const getPlaylist = (req, res, next) => {
  try {
    const id_user = req.user.id;
    const songs = songService.getPlaylist(id_user);

    return res.status(200).json({
      success: true,
      message: "Data didalam playlist anda!",
      data: songs,
    });
  } catch (error) {
    next(error);
  }
};

const getSongById = (req, res, next) => {
  try {
    const validate = songSchema.getSongById.validate(req.params);

    if (validate.error) {
      throw {
        code: 400,
        message: validate.error.details.map((d) => d.message),
      };
    }

    const id = validate.value.id;
    const result = songService.getSongById(id, req.user.id);

    return res.status(200).json({
      success: true,
      message: `Lagu dengan id ${id} berhasil ditemukan!`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const playSongById = (req, res, next) => {
  try {
    const validate = songSchema.playSong.validate(req.params);

    if (validate.error) {
      throw {
        code: 400,
        message: validate.error.details.map((d) => d.message),
      };
    }

    const result = songService.playSongById(value.id, req.user.id);

    return res.status(200).json({
      success: true,
      message: `Lagu dengan id ${id} sedang dimainkan!`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const addSong = (req, res, next) => {
  try {
    const validate = songSchema.addSong.validate(req.body, {
      abortEarly: false,
    });

    if (validate.error) {
      throw {
        code: 400,
        message: validate.error.details.map((d) => d.message),
      };
    }

    const id_user = req.user.id;
    const title = value.title;
    const artists = value.artists;
    const url = value.url;
    const result = songService.addSong(id_user, title, artists, url);

    return res.status(200).json({
      success: true,
      message: `Lagu ${title} berhasil ditambahkan!`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateSongById = (req, res, next) => {
  try {
    const data = {
      id: req.params.id,
      title: req.body.title,
      artists: req.body.artists,
      url: req.body.url,
    };

    const validatedData = songSchema.updateSong.validate(data, {
      abortEarly: false,
    });

    const result = songService.updateSongById(validatedData.value, req.user.id);

    if (!result.success) {
      throw {
        code: 400,
        message: `Lagu gagal diperbarui: ${result.message}`,
      };
    }

    return res.status(200).json({
      success: true,
      message: `Lagu dengan id ${id} berhasil diperbarui!`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSongById = (req, res, next) => {
  try {
    const validate = songSchema.deleteSong.validate(req.params);
    const id = validate.value.id;
    const result = songService.deleteSongById(id, req.user.id);

    if (!result.success) {
      throw {
        code: 400,
        message: `Lagu gagal dihapus: ${result.message}`,
      };
    }

    return res.status(200).json({
      success: true,
      message: `Lagu dengan id ${id} berhasil dihapus!`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getPlaylist,
  getSongById,
  playSongById,
  addSong,
  updateSongById,
  deleteSongById,
};
