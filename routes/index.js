const AuthRouter = require("./auth");
const UserRouter = require("./users");
const CategoryRouter = require("./categories");
const ProtectedRouter = require("./protected");
const ProductRouter = require("./products");

module.exports = (app) => {
  app.use("/auth", AuthRouter);
  app.use("/users", UserRouter);
  app.use("/categories", CategoryRouter);
  app.use("/products", ProductRouter);
  app.use("/protected", ProtectedRouter);
};
