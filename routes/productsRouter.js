const express = require("express");
const router = express.Router();
const multer = require("multer");
const productModel = require("../models/product-model");
const flash = require("connect-flash");

// Configure Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// ------------------------
// Products Listing Page
router.get("/", async (req, res) => {
    try {
        const products = await productModel.find();
        res.render("products", { products });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// ------------------------
// Admin Products Page
router.get("/admin", async (req, res) => {
    try {
        const products = await productModel.find();
        res.render("admin", { products });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// ------------------------
// Show Create Product Form
router.get("/create", (req, res) => {
    const success = req.flash("success") || [];
    res.render("createProduct", { success });
});

// ------------------------
// Create Product
router.post("/create", upload.single("image"), async (req, res) => {
    try {
        const { name, price, discount } = req.body;

        if (!name || !price || !req.file) {
            return res.send("Name, price, and image are required");
        }

        await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount: discount || 0,
        });

        req.flash("success", "Product created successfully!");
        res.redirect("/products/create");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// ------------------------
// Delete Product
// POST /products/delete/:id
// ------------------------
// Delete single product
router.post("/delete/:id", async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.id);
        req.flash("success", "Product deleted successfully!");
        res.redirect("/products/admin");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete all products
router.post("/delete-all", async (req, res) => {
    try {
        await productModel.deleteMany({});
        req.flash("success", "All products deleted successfully!");
        res.redirect("/products/admin");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
