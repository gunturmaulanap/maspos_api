const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Handle directory creation for different environments
const uploadDir = "public/uploads/products";

// Only create directory in development/local environment
// Vercel doesn't allow file system writes
if (process.env.NODE_ENV !== "production") {
  if (!fs.existsSync(uploadDir)) {
    try {
      fs.mkdirSync(uploadDir, { recursive: true });
    } catch (error) {
      console.warn("Could not create upload directory:", error.message);
    }
  }
}

// Use memory storage for production (Vercel), disk storage for development
const storage =
  process.env.NODE_ENV === "production"
    ? multer.memoryStorage() // Store in memory for Vercel
    : multer.diskStorage({
        // Store on disk for local development
        destination: function (req, file, cb) {
          cb(null, uploadDir);
        },
        filename: function (req, file, cb) {
          const ext = path.extname(file.originalname);
          const fileName = `product-${Date.now()}${ext}`;
          cb(null, fileName);
        },
      });

// Filter hanya menerima JPEG, JPG, PNG
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Bentuk jpeg, jpg, png yang diperbolehkan"));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Middleware untuk handle upload
const handleUpload = upload.single("image");

module.exports = { handleUpload };
