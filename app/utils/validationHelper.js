const { validationResult } = require("express-validator");

// Helper untuk validation errors yang bisa dipakai di semua validator
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error_data = errors.array().map((error) => ({
      field: error.param,
      message: error.msg,
      value: error.value,
    }));

    return res.status(422).json({
      status: "error",
      message: "Validation failed",
      errors: error_data,
    });
  }

  next();
};

module.exports = { handleValidationErrors };
