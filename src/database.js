const mongoose = require("mongoose");
// const dotenv= require('dotenv').config();
const configObject = require("./config/config.js");
const { logger } = require("./utils/logger.js");
//Acá hacemos la conexión con MONGODB:

//Crear una conexión con la base de datos
mongoose
  .connect(configObject.mongo_url)
  .then(() => logger.info(`Conexion exitosa a la base de datos`))
  .catch((error) => logger.error("Error en la conexion :", error));
