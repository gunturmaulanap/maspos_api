const CategoryModel = require("../models/Category");
const InvalidData = require("../exceptions/invalidData");
const Succes = require("../utils/Succes");
const { handleException } = require("../exceptions/handlers");

const createCategory = handleException(async (req, res) => {
  const { name } = req.body;

  const category = await CategoryModel.query().insert({
    name: name.trim(),
  });

  return Succes.make(res).message("Berhasil membuat kategori", category);
});

const getAllCategories = handleException(async (req, res) => {
  const users = await CategoryModel.query().select("id", "name", "created_at");
  return Succes.make(res).data(users);
});

const getCategoryById = handleException(async (req, res) => {
  const category = await CategoryModel.query().findById(req.params.id);

  if (!category) {
    throw new InvalidData("Kategori tidak ditemukan");
  }

  return Succes.make(res).data(category);
});

const updateCategory = handleException(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await CategoryModel.query().findById(id);
  if (!category) {
    throw new InvalidData("Kategori tidak ditemukan");
  }

  const updatedCategory = await CategoryModel.query().patchAndFetchById(id, {
    name: name.trim(),
  });

  return Succes.make(res).message(
    "Kategori berhasil diperbarui",
    updatedCategory
  );
});

const deleteCategory = handleException(async (req, res) => {
  const { id } = req.params;

  const category = await CategoryModel.query().findById(id);
  if (!category) {
    throw new InvalidData("Kategori tidak ditemukan");
  }

  await CategoryModel.query().deleteById(id);

  return Succes.make(res).message("Kategori berhasil dihapus", {
    deleted_category: category,
  });
});

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
