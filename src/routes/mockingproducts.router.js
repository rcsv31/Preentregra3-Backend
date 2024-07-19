const express = require("express");
const router = express.Router();
const generarProductosMock = require("../utils/mockingproducts.js"); // Importa la función para generar productos mock

// Ruta GET para obtener productos generados por Faker
router.get("/", async (req, res) => {
  const cantidad = req.query.cantidad || 100; // Obtener la cantidad de productos desde la consulta, default a 100 si no se especifica

  try {
    // Generar productos utilizando la función generarProductosMock
    const productos = await generarProductosMock(cantidad);

    // Responder con los productos generados
    res.json(productos);
  } catch (error) {
    console.error("Error generando productos:", error);
    res.status(500).send("Error generando productos");
  }
});

module.exports = router;
