/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("products", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable().unique();
    table.string("image_url").notNullable();
    table.decimal("price", 10, 2).notNullable();
    table
      .integer("category_id")
      .unsigned()
      .references("id")
      .inTable("categories")
      .onDelete("CASCADE");
    table.timestamps(true, true); // (useTimestamps, defaultToNow)
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("products");
};
