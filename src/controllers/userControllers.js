import userServices from "../services/userServices.js";
import userSchema from "../validations/userValidations.js";
import bcrypt from "bcrypt";

const getUsers = async (req, res, next) => {
  try {
    const user = await userServices.getUsers();
    return res.status(200).json({
      success: true,
      message: "Data users!",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const validasi = await userSchema.register.validateAsync(req.body, {
      abortEarly: false,
    });

    if (!validasi) {
      throw {
        code: 400,
        message: validasi.details.map((e) => e.message),
      };
    }

    const { username, email, password } = validasi;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await userServices.register(username, email, hashedPassword);

    return res.status(201).json({
      success: true,
      message: "User registered",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await userServices.login(payload);

    return res.status(200).json({
      data: {
        accessToken: result,
      },
      message: "sukses login",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getUsers,
  register,
  login,
};
