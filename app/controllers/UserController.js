const UserModel = require("../models/User");
const InvalidData = require("../exceptions/invalidData");
const Succes = require("../utils/Succes");
const { handleException } = require("../exceptions/handlers");

//Create new user (Admin only)
const createUser = handleException(async (req, res) => {
  const { name, username, email, password } = req.body;
  const existingUsername = await UserModel.query().findOne({ username });
  if (existingUsername) {
    throw new InvalidData("Username sudah digunakan!");
  }

  // Create user
  const newUser = await UserModel.query().insert({
    name,
    username,
    email,
    password,
  });

  return Succes.make(res).data(newUser);
});

// Get current user profile (from token)
const getProfile = handleException(async (req, res) => {
  const userId = req.user.id; 

  const user = await UserModel.query().findById(userId);
  if (!user) {
    throw new InvalidData("User tidak ditemukan");
  }

  // Don't return password
  const { password, ...userWithoutPassword } = user;

  return Succes.make(res).data(userWithoutPassword);
});

// Update current user profile
const updateProfile = handleException(async (req, res) => {
  const userId = req.user.id; // From verifyToken middleware
  const { name, email, username } = req.body;

  const user = await UserModel.query().findById(userId);
  if (!user) {
    throw new InvalidData("User tidak ditemukan");
  }

  const updatedUser = await UserModel.query().patchAndFetchById(userId, {
    name,
    email,
    username,
  });

  // Don't return password
  const { password, ...userWithoutPassword } = updatedUser;

  return Succes.make(res).message(
    "Profil berhasil diperbarui",
    userWithoutPassword
  );
});

// Admin only: Get all users
const getAllUsers = handleException(async (req, res) => {
  const users = await UserModel.query().select(
    "id",
    "name",
    "username",
    "email",
    "created_at"
  );

  return Succes.make(res).data(users);
});

// Admin only: Get user by ID
const getUserById = handleException(async (req, res) => {
  // TODO: Add admin role check
  const { id } = req.params;

  const user = await UserModel.query()
    .findById(id)
    .select("id", "name", "username", "email", "created_at");

  if (!user) {
    throw new InvalidData("User tidak ditemukan");
  }

  return Succes.make(res).data(user);
});

// Admin only: Update any user
const updateUser = handleException(async (req, res) => {
  // TODO: Add admin role check
  const { id } = req.params;
  const { name, email, username } = req.body;

  const user = await UserModel.query().findById(id);
  if (!user) {
    throw new InvalidData("User tidak ditemukan");
  }

  const updatedUser = await UserModel.query().patchAndFetchById(id, {
    name,
    email,
    username,
  });

  // Don't return password
  const { password, ...userWithoutPassword } = updatedUser;

  return Succes.make(res).message(
    "User berhasil diperbarui",
    userWithoutPassword
  );
});

// Admin only: Delete user
const deleteUser = handleException(async (req, res) => {
  // TODO: Add admin role check
  const { id } = req.params;
  const currentUserId = req.user.id;

  // Prevent self-deletion
  if (id == currentUserId) {
    throw new InvalidData("Tidak dapat menghapus akun sendiri");
  }

  const user = await UserModel.query().findById(id);
  if (!user) {
    throw new InvalidData("User tidak ditemukan");
  }

  await UserModel.query().deleteById(id);

  return Succes.make(res).message("User deleted successfully", {
    deleted_user: { id: user.id, name: user.name, username: user.username },
  });
});

module.exports = {
  createUser,
  getProfile,
  updateProfile,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
