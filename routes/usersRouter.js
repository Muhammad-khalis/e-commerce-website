const express = require("express");
const routers = express.Router();
const { registerUser, loginUser } = require("../controllers/authCobtroller");

// Test route
routers.get("/", (req, res) => {
    res.send("Hello");
});

// Show register page (GET)
routers.get("/register", (req, res) => {
    res.render("register");
});

// Register user (POST)
routers.post("/register", registerUser);

// Show login page (GET)
routers.get("/login", (req, res) => {
    res.render("login");
});

// Login user (POST)
routers.post("/login", loginUser);

// Products page under /users/products
routers.get("/products", (req, res) => {
    res.render("products");
});

// Admin page under /users/admin
routers.get("/admin", (req, res) => {
    res.render("admin");
});

//my Account
routers.get("/account", (req, res) => {
    res.render("account", { user: req.user });
});

// Logout route
routers.get("/logout", (req, res) => {
    res.send("Logged out successfully");
});

module.exports = routers;
