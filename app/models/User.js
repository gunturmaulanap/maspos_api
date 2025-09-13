const { Model } = require("objection");
const knex = require("./Knex");

Model.knex(knex);

module.exports = class User extends Model {
  static get tableName() {
    return "users";
  }

  //   static get idColumn() {
  //     return "id";
  //   }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "username", "email", "password"],
      properties: {
        id: { type: "integer" },
        name: { type: "string", maxLength: 50 },
        username: { type: "string", maxLength: 20 },
        email: { type: "string", format: "email", maxLength: 100 },
        password: { type: "string", maxLength: 255 },
        last_login: { type: ["string", "null"], format: "date-time" },
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
      },
    };
  }

  // Hide password when converting to JSON
  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.password;
    return json;
  }
};
