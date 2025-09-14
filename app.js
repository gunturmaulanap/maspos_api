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

// Swagger setup - place before routes
try {
  console.log("Setting up Swagger UI...");
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpecs, {
      explorer: true,
      swaggerOptions: {
        url: "/api-docs.json",
      },
      customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info .title { color: #3b4151 }
    `,
      customSiteTitle: "MASPOS API Documentation",
    })
  );

  // Export Swagger specs as JSON for external tools
  app.get("/api-docs.json", (req, res) => {
    console.log("Serving Swagger JSON specs");
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpecs);
  });

  console.log("Swagger UI setup completed");
} catch (error) {
  console.error("Error setting up Swagger:", error.message);
}

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "hbs");

app.use(logger("dev"));

//Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// Serve Swagger UI static files explicitly
app.use(
  "/api-docs-static",
  express.static(path.join(__dirname, "node_modules/swagger-ui-dist"), {
    setHeaders: (res, path) => {
      if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      } else if (path.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      }
    },
  })
);

// Routes
try {
  require("./routes")(app);
} catch (error) {
  console.error("Error loading routes:", error.message);
}

// Simple root route for testing
app.get("/", (req, res) => {
  console.log("Root route accessed");
  res.json({
    message: "MASPOS API is running!",
    docs: "/api-docs/",
    version: "2.0.0",
    timestamp: new Date().toISOString(),
  });
});

// Test route to verify Swagger is working
app.get("/test", (req, res) => {
  console.log("Test route accessed");
  res.json({
    status: "OK",
    swagger: swaggerSpecs ? "Loaded" : "Not loaded",
    timestamp: new Date().toISOString(),
  });
});

// Fallback route for /api-docs if Swagger fails
app.get("/api-docs", (req, res) => {
  console.log("Redirecting /api-docs to /api-docs/");
  res.redirect("/api-docs/");
});

// Handle all other /api-docs/* routes
app.get("/api-docs/*", (req, res, next) => {
  console.log(`Swagger route accessed: ${req.path}`);
  next();
});

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
