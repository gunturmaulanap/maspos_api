const AuthRouter = require("./auth");
const UserRouter = require("./users");
const CategoryRouter = require("./categories");
const ProtectedRouter = require("./protected");
const ProductRouter = require("./products");

const routes = (app, prefix) => {
  // Simple welcome route
  app.get("/", (req, res) => {
    res.send("Maspos API Documentation at https://localhost:3000/api-docs/");
  });

  app.use(prefix + "auth", AuthRouter);
  app.use(prefix + "users", UserRouter);
  app.use(prefix + "categories", CategoryRouter);
  app.use(prefix + "products", ProductRouter);
  app.use(prefix + "protected", ProtectedRouter);
};
module.exports = routes;
