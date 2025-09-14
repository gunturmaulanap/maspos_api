const ProductModel = require("../models/Product");
const CategoryModel = require("../models/Category");
const fs = require("fs");
const path = require("path");
const { handleException } = require("../exceptions/handlers");
const InvalidData = require("../exceptions/invalidData");

// Helper function untuk format harga
const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID").format(price);
};

// Helper function untuk save base64 image
const saveBase64Image = (base64Data, filename) => {
  const uploadDir = "public/uploads/products";
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const base64Image = base64Data.replace(/^data:image\/[a-z]+;base64,/, "");
  const buffer = Buffer.from(base64Image, "base64");
  const filePath = path.join(uploadDir, filename);
  fs.writeFileSync(filePath, buffer);

  return `/uploads/products/${filename}`;
};

// Helper function untuk handle image dari berbagai source
const getImageUrl = (req) => {
  if (req.file) {
    return `/uploads/products/${req.file.filename}`;
  }

  if (req.body.image_base64) {
    const timestamp = Date.now();
    const filename = `product-${timestamp}.jpg`;
    return saveBase64Image(req.body.image_base64, filename);
  }

  if (req.body.image_url) {
    return req.body.image_url;
  }

  return null;
};

// Helper function untuk format product response
const formatProductResponse = (product, req) => {
  return {
    ...product,
    price: formatPrice(product.price),
    original_price: product.price,
    image_url: `${req.protocol}://${req.get("host")}${product.image_url}`,
  };
};

// Helper function untuk validasi category
const validateCategory = async (category_id) => {
  if (!category_id) {
    throw new InvalidData("Kategori diperlukan");
  }

  const category = await CategoryModel.query().findById(category_id);
  if (!category) {
    throw new InvalidData(`Kategori dengan ID ${category_id} tidak ditemukan`);
  }

  return category;
};

const getAllProducts = handleException(async (req, res) => {
  const products = await ProductModel.query().withGraphFetched("category");

  // Format harga untuk setiap produk
  const formattedProducts = products.map((product) => ({
    ...product,
    price: formatPrice(product.price), // 29000 → "29.000"
    original_price: product.price, // Simpan harga asli jika diperlukan
  }));

  return res.json({
    message: "Product berhasil diambil",
    data: formattedProducts,
  });
});

const createProduct = handleException(async (req, res) => {
  // Log payload yang diterima
  console.log("CREATE PRODUCT PAYLOAD:", req.body);
  // Jangan ambil id dari req.body, hanya ambil field yang diperlukan
  const { name, price, category_id } = req.body;

  // Validasi category (tetap diperlukan karena cek ke database)
  await validateCategory(category_id);

  // Handle image
  const image_url = getImageUrl(req);
  if (!image_url) {
    throw new InvalidData(
      "Gambar produk diperlukan (upload file, base64, atau URL)"
    );
  }

  // Insert product tanpa id, biarkan database generate otomatis
  const product = await ProductModel.query().insert({
    name,
    image_url,
    price: parseFloat(price),
    category_id,
  });

  // Format dan return response
  const formattedProduct = formatProductResponse(product, req);

  return res.json({
    status: "success",
    message: "Product berhasil dibuat",
    data: formattedProduct,
  });
});

const uploadImage = handleException(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "Tidak ada file yang diupload",
    });
  }

  const imageUrl = `/uploads/products/${req.file.filename}`;
  const fullUrl = `${req.protocol}://${req.get("host")}${imageUrl}`;

  return res.json({
    message: "Gambar berhasil diupload  ",
    data: {
      image_url: imageUrl,
      full_url: fullUrl,
      filename: req.file.filename,
      size: req.file.size,
    },
  });
});

const getProductById = handleException(async (req, res) => {
  const { id } = req.params;

  const product = await ProductModel.query()
    .findById(id)
    .withGraphFetched("category");

  if (!product) {
    return res.status(404).json({
      message: "Product tidak ditemukan",
    });
  }

  // Format response
  const formattedProduct = {
    ...product,
    price: formatPrice(product.price),
    original_price: product.price,
    image_url: `${req.protocol}://${req.get("host")}${product.image_url}`,
  };

  return res.json({
    message: "Product berhasil diambil",
    data: formattedProduct,
  });
});

const updateProduct = handleException(async (req, res) => {
  const { id } = req.params;
  const { name, price, category_id } = req.body;

  // Cek apakah product ada
  const existingProduct = await ProductModel.query().findById(id);
  if (!existingProduct) {
    return res.status(404).json({
      message: "Product tidak ditemukan",
    });
  }

  // Handle image update
  let image_url = existingProduct.image_url;
  if (req.file) {
    // Jika ada file yang diupload (multipart)
    image_url = `/uploads/products/${req.file.filename}`;
  } else if (req.body.image_base64) {
    // Jika menggunakan base64
    const timestamp = Date.now();
    const filename = `product-${timestamp}.jpg`;
    image_url = saveBase64Image(req.body.image_base64, filename);
  } else if (req.body.image_url) {
    // Jika menggunakan URL langsung
    image_url = req.body.image_url;
  }

  // Update product
  const updatedProduct = await ProductModel.query()
    .patchAndFetchById(id, {
      name: name || existingProduct.name,
      image_url,
      price: price ? parseFloat(price) : existingProduct.price,
      category_id: category_id || existingProduct.category_id,
    })
    .withGraphFetched("category");

  // Format response
  const formattedProduct = {
    ...updatedProduct,
    price: formatPrice(updatedProduct.price),
    original_price: updatedProduct.price,
    image_url: `${req.protocol}://${req.get("host")}${
      updatedProduct.image_url
    }`,
  };

  return res.json({
    message: "Product berhasil diupdate",
    data: formattedProduct,
  });
});

const deleteProduct = handleException(async (req, res) => {
  const { id } = req.params;

  // Cek apakah product ada
  const existingProduct = await ProductModel.query().findById(id);
  if (!existingProduct) {
    return res.status(404).json({
      message: "Tidak ada product dengan ID tersebut",
    });
  }

  // Delete product
  await ProductModel.query().deleteById(id);

  return res.json({
    message: "Product berhasil dihapus",
    data: {
      id: parseInt(id),
      name: existingProduct.name,
    },
  });
});

module.exports = {
  getAllProducts,
  createProduct,
  uploadImage,
  getProductById,
  updateProduct,
  deleteProduct,
  formatPrice, // Export helper function
};
