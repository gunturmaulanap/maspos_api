const { check } = require("express-validator");
const { handleValidationErrors } = require("../utils/validationHelper");

//Create user validation (untuk admin)
const createUser = [
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
  // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
  // .withMessage(
  //   "Password harus mengandung minimal 1 huruf kecil, 1 huruf besar, dan 1 angka!"
  // ),

  handleValidationErrors,
];

// Update profile validation
const updateProfile = [
  check("name")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("Nama harus antara 2-50 karakter!")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Nama hanya boleh mengandung huruf dan spasi!"),

  check("username")
    .optional()
    .isLength({ min: 3, max: 20 })
    .withMessage("Username harus antara 3-20 karakter!")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage(
      "Username hanya boleh mengandung huruf, angka, dan underscore!"
    ),

  check("email")
    .optional()
    .isEmail()
    .withMessage("Format email tidak valid!")
    .normalizeEmail(),

  handleValidationErrors,
];

// Get user by ID validation (untuk admin)
const getUserById = [
  check("id", "ID user harus berupa angka positif!").isInt({ min: 1 }).toInt(),

  handleValidationErrors,
];

// Update user validation (untuk admin)
const updateUser = [
  check("id", "ID user harus berupa angka positif!").isInt({ min: 1 }).toInt(),

  check("name")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("Nama harus antara 2-50 karakter!")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Nama hanya boleh mengandung huruf dan spasi!"),

  check("email")
    .optional()
    .isEmail()
    .withMessage("Format email tidak valid!")
    .normalizeEmail(),

  check("username")
    .optional()
    .isLength({ min: 3, max: 20 })
    .withMessage("Username harus antara 3-20 karakter!")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage(
      "Username hanya boleh mengandung huruf, angka, dan underscore!"
    ),

  handleValidationErrors,
];

// Delete user validation (untuk admin)
const deleteUser = [
  check("id", "ID user harus berupa angka positif!").isInt({ min: 1 }).toInt(),

  handleValidationErrors,
];

module.exports = {
  updateProfile,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
};
