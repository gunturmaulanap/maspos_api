// Utility functions untuk formatting

/**
 * Format harga dengan thousand separator (titik)
 * @param {number} price - Harga dalam bentuk number
 * @returns {string} - Harga yang sudah diformat (contoh: "29.000")
 */
const formatPrice = (price) => {
  if (!price && price !== 0) return "0";
  return new Intl.NumberFormat("id-ID").format(price);
};

/**
 * Format harga dengan prefix Rp
 * @param {number} price - Harga dalam bentuk number
 * @returns {string} - Harga dengan format Rupiah (contoh: "Rp 29.000")
 */
const formatRupiah = (price) => {
  if (!price && price !== 0) return "Rp 0";
  return `Rp ${new Intl.NumberFormat("id-ID").format(price)}`;
};

/**
 * Parse string harga kembali ke number
 * @param {string} formattedPrice - Harga yang sudah diformat
 * @returns {number} - Harga dalam bentuk number
 */
const parsePrice = (formattedPrice) => {
  if (typeof formattedPrice === "number") return formattedPrice;
  return parseFloat(formattedPrice.replace(/[^\d]/g, ""));
};

module.exports = {
  formatPrice,
  formatRupiah,
  parsePrice,
};
