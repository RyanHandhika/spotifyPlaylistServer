import data from "../data/users.js";
import userModel from "../models/userModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET;

const getUser = () => {
  if (data.length === 0) {
    throw {
      code: 404,
      message: "Data user masih kosong, silahkan tambah terlebih dahulu!",
    };
  }
  return data;
};

const register = (username, email, password) => {
  const duplicatedEmail = data.find((user) => user.email === email);
  if (duplicatedEmail) {
    throw {
      code: 409,
      message: "Email already in use",
    };
  }

  const newUser = new userModel(username, email, password);
  data.push(newUser);

  return newUser;
};

const login = async ({ email, password }) => {
  const user = data.find((u) => u.email === email);

  if (!user) {
    throw new ResponseError(401, "invalid");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new ResponseError(401, "invalid");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    }
  );

  console.log(token);

  return token;
};

export default {
  getUser,
  register,
  login,
};
