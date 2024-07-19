const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controller.js");
const messagesController = require("../controllers/messages.controller.js");
const userController = require("../controllers/user.controller.js");

// Rutas para vistas de productos
router.get("/products", productsController.getProductsView);
router.get("/realTimeProducts", productsController.getRealTimeProductsView);

// Ruta para cargar la página de chat
router.get("/chat", messagesController.getChatView);

// Rutas para registro y login
router.get("/register", (req, res) => res.render("register"));
router.get("/login", (req, res) => res.render("login"));
// Cerrar sesión
router.post("/logout", userController.logout);

// Solicitud de restablecimiento de contraseña
router.get("/request-password-reset", userController.requestPasswordReset);

// Restablecimiento de contraseña
router.get("/reset-password", userController.resetPassword);

// Cambio de rol del usuario
router.post("/cambiar-rol/:uid", userController.cambiarRolPremium);

// Confirmación de envío de restablecimiento de contraseña (ejemplo de una vista)
router.get("/confirmacion-envio", (req, res) => {
  res.render("confirmacion-envio"); // Renderiza la vista de confirmación
});

module.exports = router;
