const { body, param } = require("express-validator");
const { handleValidationErrors } = require("../utils/validationHelper");

// Validation untuk create category
const validateCreateCategory = [
  body("name")
    .notEmpty()
    .withMessage("Nama kategori diperlukan")
    .isLength({ min: 2, max: 100 })
    .withMessage("Nama kategori harus antara 2-100 karakter")
    .trim()
    .escape(),

  handleValidationErrors,
];

// Validation untuk update category
const validateUpdateCategory = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Category ID harus berupa angka positif"),

  body("name")
    .notEmpty()
    .withMessage("Nama kategori diperlukan")
    .isLength({ min: 2, max: 100 })
    .withMessage("Nama kategori harus antara 2-100 karakter")
    .trim()
    .escape(),

  handleValidationErrors,
];

// Validation untuk get/delete category by ID
const validateCategoryId = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Category ID harus berupa angka positif"),

  handleValidationErrors,
];

module.exports = {
  validateCreateCategory,
  validateUpdateCategory,
  validateCategoryId,
};
