const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controller");
const { isAdmin, isUser } = require("../middlewares/authorization");
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("session"),
  productsController.getProductsView
);
router.get(
  "/realTimeProducts",
  passport.authenticate("session"),
  productsController.getRealTimeProductsView
);

// Rutas para operaciones de productos protegidas para administradores
router.post(
  "/",
  passport.authenticate("session"),
  isAdmin,
  productsController.createProduct
);
router.get(
  "/:id",
  passport.authenticate("session"),
  productsController.getProductById
);
router.put(
  "/:id",
  passport.authenticate("session"),
  isAdmin,
  productsController.updateProduct
);
router.delete(
  "/:id",
  passport.authenticate("session"),
  isAdmin,
  productsController.deleteProduct
);

module.exports = router;
