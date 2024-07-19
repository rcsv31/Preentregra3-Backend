const express = require("express");
const router = express.Router();
const { isUser } = require("../middlewares/authorization");

// Ruta para enviar mensajes al chat
router.post("/message", isUser, (req, res) => {
  // Lógica para enviar el mensaje
  res.send("Mensaje enviado");
});

module.exports = router;
