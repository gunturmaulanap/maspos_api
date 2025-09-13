const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const InvalidData = require("../exceptions/invalidData");
const { handleException } = require("../exceptions/handlers");
const { invalidateToken } = require("../utils/tokenStore");
// const Succes = require("../utils/Succes");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

// Register/SignUp
const signUp = handleException(async (req, res) => {
  const { name, username, email, password } = req.body;

  // Cek duplikasi username
  const existingUsername = await UserModel.query().findOne({ username });
  if (existingUsername) {
    throw new InvalidData("Username sudah digunakan!");
  }

  // Cek duplikasi email
  const existingEmail = await UserModel.query().findOne({ email });
  if (existingEmail) {
    throw new InvalidData("Email sudah digunakan!");
  }

  // Hash password dan buat user
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = await UserModel.query().insert({
    name: name.trim(),
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password: hashedPassword,
  });

  return res.status(201).json({
    status: "success",
    message: "User registered successfully",
    data: {
      user: {
        id: newUser.id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
      },
    },
  });
});

// Login
const login = handleException(async (req, res) => {
  const { username, password } = req.body;

  // Cari user (username atau email)
  const user = await UserModel.query()
    .where(function () {
      this.where("username", username.toLowerCase());
    })
    .first();

  if (!user) {
    throw new InvalidData("Username tidak ditemukan!");
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new InvalidData("Password salah!");
  }

  // Generate token (simple approach)
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 1000,
  });

  return res.json({
    status: "success",
    message: "Login berhasil",
    data: {
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
      token,
    },
  });
});

// Change Password
const changePassword = handleException(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  const user = await UserModel.query().findById(userId);
  if (!user) {
    throw new InvalidData("User tidak ditemukan!");
  }

  // Verify current password
  const isCurrentPasswordValid = await bcrypt.compare(
    currentPassword,
    user.password
  );
  if (!isCurrentPasswordValid) {
    throw new InvalidData("Password saat ini salah!");
  }

  // Update password
  const hashedNewPassword = await bcrypt.hash(newPassword, 12);
  await UserModel.query().patchAndFetchById(userId, {
    password: hashedNewPassword,
  });

  return res.json({
    status: "success",
    message: "Password berhasil diubah",
  });
});

// Logout
const logout = handleException(async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new InvalidData("Token tidak ditemukan!");
  }

  const token = authHeader.split(" ")[1];

  // Simple approach: Add token to blacklist
  invalidateToken(token);

  return res.json({
    status: "success",
    message: "Logout berhasil",
  });
});

module.exports = {
  signUp,
  login,
  changePassword,
  logout,
};
