import songService from "../services/songServices.js";
import songSchema from "../validations/songValidations.js";

const getPlaylist = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const songs = await songService.getPlaylist(userId);

    return res.status(200).json({
      success: true,
      message: "Data didalam playlist anda!",
      data: songs,
    });
  } catch (error) {
    next(error);
  }
};

const getSongById = async (req, res, next) => {
  try {
    const validate = await songSchema.getSongById.validateAsync(req.params);

    if (!validate) {
      throw {
        code: 400,
        message: validate.error.details.map((d) => d.message),
      };
    }

    const id = validate.id;
    const result = await songService.getSongById(id, req.user.id);

    return res.status(200).json({
      success: true,
      message: `Lagu dengan id ${id} berhasil ditemukan!`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const playSongById = async (req, res, next) => {
  try {
    const validate = await songSchema.playSong.validateAsync(req.params);

    if (!validate) {
      throw {
        code: 400,
        message: validate.details.map((d) => d.message),
      };
    }

    const result = await songService.playSongById(validate.id, req.user.id);

    return res.status(200).json({
      success: true,
      message: `Lagu dengan id ${validate.id} sedang dimainkan!`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const addSong = async (req, res, next) => {
  try {
    const validate = await songSchema.addSong.validateAsync(req.body, {
      abortEarly: false,
    });

    if (!validate) {
      throw {
        code: 400,
        message: validate.details.map((d) => d.message),
      };
    }

    const userId = req.user.id;
    const title = validate.title;
    const artists = validate.artists;
    const url = validate.url;
    const result = await songService.addSong(userId, title, artists, url);

    return res.status(200).json({
      success: true,
      message: `Lagu ${title} berhasil ditambahkan!`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateSongById = async (req, res, next) => {
  try {
    const data = {
      id: req.params.id,
      title: req.body.title,
      artists: req.body.artists,
      url: req.body.url,
    };

    const validate = await songSchema.updateSong.validateAsync(data, {
      abortEarly: false,
    });

    const result = await songService.updateSongById(validate, req.user.id);

    if (!result) {
      throw {
        code: 400,
        message: `Lagu gagal diperbarui: ${result.message}`,
      };
    }

    return res.status(200).json({
      success: true,
      message: `Lagu dengan id ${validate.id} berhasil diperbarui!`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSongById = async (req, res, next) => {
  try {
    const validate = await songSchema.deleteSong.validateAsync(req.params);
    const id = validate.id;
    const result = await songService.deleteSongById(id, req.user.id);

    if (!result) {
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
