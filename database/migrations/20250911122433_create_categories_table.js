/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("categories", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable().unique();
    table.timestamps(true, true); // (useTimestamps, defaultToNow)
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("categories");
};
