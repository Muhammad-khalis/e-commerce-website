const express = require("express");
const router = express.Router();
const isloggedIn = require("../middleware/isloggedIn");
const userModel = require("../models/user-model");
const productModel = require("../models/product-model"); // path ko check karo

// Home route
router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index",{error,loggedin:false});
});

router.get("/shop", async (req, res) => {
    try {
        let sortby = req.query.sortby || "popular"; // default popular
        let products = await productModel.find();

        // Example sorting
        if(sortby === "newest"){
            products = products.sort((a,b) => b.createdAt - a.createdAt);
        }

        res.render("shop", { products, sortby, success: req.flash("success") });
    } catch(err){
        console.log(err);
        res.send("Error loading shop");
    }
});

// Add to cart / update product example
router.post("/:id", async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).send("Product not found");
        }

        // yahan cart me add ya update logic likho
        res.send(`Product ${product.name} processed successfully`);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


// cart
router.get("/cart", isloggedIn, async (req, res) => {
 let user=await userModel.findOne({email:req.user.email}).populate("cart")
  res.render("cart",{user});
});



// Logout route
router.get("/logout", isloggedIn, (req, res) => {
  res.render("logout");
});

module.exports = router;
