const { check } = require("express-validator");
const { handleValidationErrors } = require("../utils/validationHelper");

// Register validation
const register = [
  check("name")
    .notEmpty()
    .withMessage("Nama tidak boleh kosong!")
    .isLength({ min: 2, max: 50 })
    .withMessage("Nama harus antara 2-50 karakter!")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Nama hanya boleh mengandung huruf dan spasi!"),

  check("username")
    .notEmpty()
    .withMessage("Username tidak boleh kosong!")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username harus antara 3-20 karakter!")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage(
      "Username hanya boleh mengandung huruf, angka, dan underscore!"
    ),

  check("email")
    .notEmpty()
    .withMessage("Email tidak boleh kosong!")
    .isEmail()
    .withMessage("Format email tidak valid!")
    .normalizeEmail(),

  check("password")
    .notEmpty()
    .withMessage("Password tidak boleh kosong!")
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter!"),

  handleValidationErrors,
];

// Login validation
const login = [
  check("username")
    .notEmpty()
    .withMessage("Username tidak boleh kosong!")
    .isLength({ min: 3 })
    .withMessage("Username minimal 3 karakter!"),

  check("password")
    .notEmpty()
    .withMessage("Password tidak boleh kosong!")
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter!"),

  handleValidationErrors,
];

const changePassword = [
  check("currentPassword")
    .notEmpty()
    .withMessage("Password saat ini tidak boleh kosong!"),

  check("newPassword")
    .notEmpty()
    .withMessage("Password baru tidak boleh kosong!")
    .isLength({ min: 8 })
    .withMessage("Password baru minimal 8 karakter!"),

  handleValidationErrors,
];

module.exports = {
  register,
  login,
  changePassword,
};
