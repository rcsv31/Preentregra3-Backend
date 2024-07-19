const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller.js");
const { isUser } = require("../middlewares/authorization");
const passport = require("passport");

router.post(
  "/purchase",
  passport.authenticate("session"),
  isUser,
  cartController.createCart
);
router.get(
  "/",
  passport.authenticate("session"),
  isUser,
  cartController.getCarts
);
router.get(
  "/:id",
  passport.authenticate("session"),
  isUser,
  cartController.getCartById
);
router.put(
  "/:id",
  passport.authenticate("session"),
  isUser,
  cartController.updateCart
);
router.delete(
  "/:id",
  passport.authenticate("session"),
  isUser,
  cartController.deleteCart
);
router.get(
  "/:id/products",
  passport.authenticate("session"),
  isUser,
  cartController.getProductsFromCart
);
router.post(
  "/:id/products",
  passport.authenticate("session"),
  isUser,
  cartController.addProductToCart
);
router.delete(
  "/:id/products/:productId",
  passport.authenticate("session"),
  isUser,
  cartController.deleteProductById
);
router.post(
  "/:id/clear",
  passport.authenticate("session"),
  isUser,
  cartController.clearCart
);

module.exports = router;
