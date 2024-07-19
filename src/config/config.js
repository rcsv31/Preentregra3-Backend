const dotenv = require("dotenv");
const program = require("../utils/commander.js");
const { mode } = program.opts();

// Cargar las variables de entorno según el modo especificado por commander.js
dotenv.config({
  path: mode === "produccion" ? "./.env.production" : "./.env.development",
});

// Objeto de configuración que exportaremos
const configObject = {
  puerto: process.env.PUERTO, // Puerto de la aplicación
  mongo_url: process.env.MONGO_URL, // URL de conexión a MongoDB
  session_secret: process.env.SESSION_SECRET, // Secreto para sesiones de Express
};

// Exportar el objeto de configuración para ser utilizado en otras partes de la aplicación
module.exports = configObject;
