const bcrypt = require("bcrypt");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();

  // Hash password
  const hashedPassword = await bcrypt.hash("password", 10);

  // Inserts seed entries
  await knex("users").insert([
    {
      id: 1,
      name: "Administrator",
      username: "admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 2,
      name: "Guntur Maulana",
      username: "gunturmaulana",
      email: "guntur@gmail.com",
      password: hashedPassword,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ]);

  console.log("✅ Users seeded successfully");
};
