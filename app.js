require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./swagger");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productsRouter = require("./routes/products");

var app = express();

// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Export Swagger specs as JSON for external tools
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpecs);
});

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "hbs");

app.use(logger("dev"));

//Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// Routes
const routes = require("./routes");
routes(app, "/");

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Log error untuk debugging
  if (req.app.get("env") === "development") {
    console.log("Error:", err);
  }

  // Response object yang lebih informatif
  const response = {
    status: "error",
    message: err.message || "Internal Server Error",
  };

  // Tambahkan informasi tambahan jika ada
  if (err.error_type) {
    response.error_type = err.error_type;
  }

  if (err.details && req.app.get("env") === "development") {
    response.details = err.details;
  }

  // Set status code yang sesuai
  const statusCode = err.status || err.statusCode || 500;
  res.status(statusCode).json(response);
});

module.exports = app;
