const knex = require("./app/models/Knex");

async function syncProductIdSequence() {
  await knex.raw(
    "SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));"
  );
  console.log("Sequence products_id_seq sudah disinkronkan!");
  process.exit(0);
}

syncProductIdSequence();
