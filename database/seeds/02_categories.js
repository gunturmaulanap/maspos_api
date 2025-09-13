/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('categories').del();
  
  // Inserts seed entries
  await knex('categories').insert([
    {
      id: 1,
      name: 'Pizza',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: 2,
      name: 'Burger',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: 3,
      name: 'Fried Chicken',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: 4,
      name: 'Beverages',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: 5,
      name: 'Snacks',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    }
  ]);
  
  console.log('✅ Categories seeded successfully');
};