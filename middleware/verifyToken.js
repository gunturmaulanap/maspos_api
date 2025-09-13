const jwt = require("jsonwebtoken");
const { isTokenInvalidated } = require("../app/utils/tokenStore");

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];

  // Check if token has been invalidated (logged out)
  if (isTokenInvalidated(token)) {
    return res.status(401).json({
      message: "Token telah dinonaktifkan, silakan login kembali.",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token kadaluwarsa atau tidak valid" });
  }
};

module.exports = verifyToken;
