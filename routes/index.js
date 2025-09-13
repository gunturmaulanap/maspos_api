const AuthRouter = require("./auth");
const UserRouter = require("./users");
const CategoryRouter = require("./categories");
const ProtectedRouter = require("./protected");
const ProductRouter = require("./products");

const routes = (app, prefix) => {
  // Routes will be handled by Vercel redirect to /api-docs
  // No need for root route as Vercel handles the redirect

  app.use(prefix + "auth", AuthRouter);
  app.use(prefix + "users", UserRouter);
  app.use(prefix + "categories", CategoryRouter);
  app.use(prefix + "products", ProductRouter);
  app.use(prefix + "protected", ProtectedRouter);
};
module.exports = routes;
