import Joi from "joi";

const register = Joi.object({
  username: Joi.string().trim().min(1).required().messages({
    "username.min": "Username minimal 1 karakter!",
    "username.required": "Username harus diisi!",
    "username.empty": "Username tidak boleh kosong!",
    "username.string": "data yang anda masukkan tidak valid!",
  }),
  email: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "email.required": "Email harus diisi!",
      "email.empty": "Email tidak boleh kosong!",
      "email.string": "data yang anda masukkan tidak valid!",
    }),
  password: Joi.string().min(8).max(128).required().messages({
    "password.min": "password minimal 8 karakter!",
    "password.max": "password maksimal 128 karakter!",
    "password.required": "password harus diisi!",
    "password.empty": "password tidak boleh kosong!",
    "password.string": "data yang anda masukkan tidak valid!",
  }),
});

const login = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "email.required": "Email harus diisi!",
      "email.empty": "Email tidak boleh kosong!",
      "email.string": "data yang anda masukkan tidak valid!",
    }),
  password: Joi.string().min(8).max(128).required().messages({
    "password.min": "password minimal 8 karakter!",
    "password.max": "password maksimal 128 karakter!",
    "password.required": "password harus diisi!",
    "password.empty": "password tidak boleh kosong!",
    "password.string": "data yang anda masukkan tidak valid!",
  }),
});

export default { register, login };
