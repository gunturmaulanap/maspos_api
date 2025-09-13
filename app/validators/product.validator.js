const { body, param } = require("express-validator");
const { handleValidationErrors } = require("../utils/validationHelper");

// Validation untuk create product
const validateCreateProduct = [
  body("name")
    .notEmpty()
    .withMessage("Nama produk diperlukan")
    .isLength({ min: 2, max: 255 })
    .withMessage("Nama produk harus antara 2-255 karakter")
    .trim(),

  body("price")
    .notEmpty()
    .withMessage("Harga produk diperlukan")
    .isFloat({ min: 0 })
    .withMessage("Harga produk harus berupa angka positif"),

  body("category_id")
    .notEmpty()
    .withMessage("Category ID diperlukan")
    .isInt({ min: 1 })
    .withMessage("Category ID harus berupa angka positif"),

  // Validation untuk image (opsional karena bisa dari berbagai source)
  body("image_base64")
    .optional()
    .matches(/^data:image\/(jpeg|jpg|png|gif);base64,/)
    .withMessage("Format base64 image tidak valid"),

  body("image_url").optional().isURL().withMessage("URL gambar tidak valid"),

  handleValidationErrors,
];

// Validation untuk update product
const validateUpdateProduct = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Product ID harus berupa angka positif"),

  body("name")
    .optional()
    .isLength({ min: 2, max: 255 })
    .withMessage("Nama produk harus antara 2-255 karakter")
    .trim(),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Harga produk harus berupa angka positif"),

  body("category_id")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Category ID harus berupa angka positif"),

  body("image_base64")
    .optional()
    .matches(/^data:image\/(jpeg|jpg|png|gif);base64,/)
    .withMessage("Format base64 image tidak valid"),

  body("image_url").optional().isURL().withMessage("URL gambar tidak valid"),

  handleValidationErrors,
];

// Validation untuk get/delete product by ID
const validateProductId = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Product ID harus berupa angka positif"),

  handleValidationErrors,
];

module.exports = {
  validateCreateProduct,
  validateUpdateProduct,
  validateProductId,
};
