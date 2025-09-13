module.exports = class InvalidData extends Error {
  constructor(message, code = 422) {
    super(message);
    this.message = message || "Terjadi kesalahan pada data yang dikirimkan";
    this.code = code;
  }
};
