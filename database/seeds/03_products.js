/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("products").del();

  // Inserts seed entries
  await knex("products").insert([
    // Pizza Category (ID: 1)
    {
      id: 1,
      name: "Margherita Pizza",
      image_url:
        "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=400&fit=crop",
      price: 85000,
      category_id: 1,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 2,
      name: "Pepperoni Pizza",
      image_url:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop",
      price: 95000,
      category_id: 1,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 3,
      name: "Hawaiian Pizza",
      image_url:
        "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&h=400&fit=crop",
      price: 92000,
      category_id: 1,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 4,
      name: "Supreme Pizza",
      image_url:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop",
      price: 105000,
      category_id: 1,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },

    // Burger Category (ID: 2)
    {
      id: 5,
      name: "Classic Beef Burger",
      image_url:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop",
      price: 45000,
      category_id: 2,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 6,
      name: "Chicken Burger Deluxe",
      image_url:
        "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&h=400&fit=crop",
      price: 42000,
      category_id: 2,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 7,
      name: "Double Cheese Burger",
      image_url:
        "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=400&fit=crop",
      price: 55000,
      category_id: 2,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 8,
      name: "Bacon Burger",
      image_url:
        "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=400&fit=crop",
      price: 58000,
      category_id: 2,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 9,
      name: "Fish Burger",
      image_url:
        "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=400&fit=crop",
      price: 48000,
      category_id: 2,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },

    // Fried Chicken Category (ID: 3)
    {
      id: 10,
      name: "Crispy Fried Chicken",
      image_url:
        "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=400&fit=crop",
      price: 35000,
      category_id: 3,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 11,
      name: "Spicy Wings",
      image_url:
        "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&h=400&fit=crop",
      price: 32000,
      category_id: 3,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 12,
      name: "Chicken Nuggets",
      image_url:
        "https://images.unsplash.com/photo-1606755962773-d324e2650a16?w=400&h=400&fit=crop",
      price: 28000,
      category_id: 3,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 13,
      name: "Honey Glazed Chicken",
      image_url:
        "https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?w=400&h=400&fit=crop",
      price: 38000,
      category_id: 3,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 14,
      name: "BBQ Chicken",
      image_url:
        "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&h=400&fit=crop",
      price: 40000,
      category_id: 3,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },

    // Beverages Category (ID: 4)
    {
      id: 15,
      name: "Coca Cola",
      image_url:
        "https://images.unsplash.com/photo-1581636625402-29d2c697e846?w=400&h=400&fit=crop",
      price: 8000,
      category_id: 4,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 16,
      name: "Orange Juice",
      image_url:
        "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&h=400&fit=crop",
      price: 12000,
      category_id: 4,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 17,
      name: "Iced Tea",
      image_url:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop",
      price: 10000,
      category_id: 4,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 18,
      name: "Milkshake Vanilla",
      image_url:
        "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=400&fit=crop",
      price: 18000,
      category_id: 4,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },

    // Snacks Category (ID: 5)
    {
      id: 19,
      name: "French Fries",
      image_url:
        "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=400&fit=crop",
      price: 15000,
      category_id: 5,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 20,
      name: "Onion Rings",
      image_url:
        "https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&h=400&fit=crop",
      price: 18000,
      category_id: 5,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ]);

  console.log("✅ Products seeded successfully");
};
