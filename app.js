//how to run on web
// http://localhost:3000/products/create
//http://localhost:3000/users/login
//http://localhost:3000/users/register
// http://localhost:3000/products/create
//http://localhost:3000/products
// http://localhost:3000/shop



// Core Modules
const path = require("path");

// Third-party Modules
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const jwt = require("jsonwebtoken");
require("dotenv").config();


// Utils
const { generateToken } = require("./utils/generateToken");

// Database
const db = require("./config/mongoose-connect");

// Routers
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");
const indexRouter = require("./routes/index");

// Initialize Express App
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Session & Flash Configuration
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET || "defaultSecret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

// Routes
app.get("/", (req, res) => {
  res.send("Hello Muhammad Khalis 👋 E-commerce server is running!");
});

app.use("/owners", ownersRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/", indexRouter);


// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
