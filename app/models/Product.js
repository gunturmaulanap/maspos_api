const { Model } = require("objection");
const knex = require("./Knex");

Model.knex(knex);

module.exports = class Product extends Model {
  static get tableName() {
    return "products";
  }

  static get relationMappings() {
    const Category = require("./Category");

    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: "products.category_id",
          to: "categories.id",
        },
      },
    };
  }
  get formattedPrice() {
    return new Intl.NumberFormat("id-ID").format(this.price);
  }

  get priceRupiah() {
    return `Rp ${new Intl.NumberFormat("id-ID").format(this.price)}`;
  }

  $formatJson(json) {
    json = super.$formatJson(json);
    return {
      ...json,
      formatted_price: this.formattedPrice,
      price_rupiah: this.priceRupiah,
    };
  }
};
