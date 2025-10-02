// import data from "../data/users.js";
// import userModel from "../models/userModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

// const JWT_SECRET = process.env.JWT_SECRET;
const prisma = new PrismaClient();
const data = prisma.user;

const getUsers = async () => {
  const allData = await data.findMany();
  return allData;
};

const register = async (username, email, password) => {
  const duplicatedEmail = await data.findUnique({
    where: { email },
  });

  if (duplicatedEmail) {
    throw {
      code: 409,
      message: "Email already in use",
    };
  }

  const newUser = await data.create({
    data: {
      username,
      email,
      password,
    },
  });
  return newUser;
};

const login = async ({ email, password }) => {
  const user = await data.findUnique({ where: { email } });

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
      expiresIn: "60m",
    }
  );

  return token;
};

export default {
  getUsers,
  register,
  login,
};
