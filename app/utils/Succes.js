class Succes {
  static make(res) {
    this.res = res;
    return this;
  }

  static message(message, data = null) {
    this.res.json({ message: message, data: data });
  }

  static data(data) {
    this.res.json({ data: data });
  }
}
module.exports = Succes;
