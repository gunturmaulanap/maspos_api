const { UniqueViolationError } = require("objection");

// Simple error message mapping
const getErrorMessage = (error) => {
  if (error instanceof UniqueViolationError) {
    const table = error.table;
    const column = error.columns[0];

    // Simple mapping untuk pesan yang lebih jelas
    if (table === "products" && column === "name") {
      return "Nama produk sudah ada yang menggunakan";
    }
    if (table === "categories" && column === "name") {
      return "Nama kategori sudah ada yang menggunakan";
    }
    if (table === "users" && column === "username") {
      return "Username sudah digunakan";
    }
    if (table === "users" && column === "email") {
      return "Email sudah terdaftar";
    }

    return `${column} sudah ada yang menggunakan`;
  }

  return error.message || "Terjadi kesalahan";
};

exports.handleException = (fn) => (req, res, next) => {
  fn(req, res, next).catch((err) => {
    const message = getErrorMessage(err);
    const status = err instanceof UniqueViolationError ? 409 : 500;

    return next({
      status,
      message,
    });
  });
};
