const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async (req, res, next) => {
    try {
        const token = req.cookies?.token;  // optional chaining for safety
        if (!token) {
            req.flash("error", "You need to login first");
            return res.redirect("/login");
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await userModel.findOne({ email: decoded.email }).select("-password");

        if (!user) {
            req.flash("error", "User not found");
            return res.redirect("/login");
        }

        req.user = user; // attach user to request
        next();          // continue to route

    } catch (err) {
        console.log(err);
        req.flash("error", "Something went wrong");
        return res.redirect("/login");
    }
};
