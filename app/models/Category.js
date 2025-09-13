const { Model } = require("objection");
const knex = require("./Knex");

Model.knex(knex);

class Category extends Model {
  static get tableName() {
    return "categories";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 100 },
        created_at: { type: "string" },
        updated_at: { type: "string" },
      },
    };
  }

  // Relationship with products
  static get relationMappings() {
    const Product = require("./Product");

    return {
      products: {
        relation: Model.HasManyRelation,
        modelClass: Product,
        join: {
          from: "categories.id",
          to: "products.category_id",
        },
      },
    };
  }
}

module.exports = Category;
