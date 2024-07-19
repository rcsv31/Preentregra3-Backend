// routes/loggertest.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  req.logger.http("Mensaje http");
  req.logger.info("Mensaje Info");
  req.logger.warning("Mensaje Warning");
  req.logger.error("Mensaje Error");

  res.send("Logs generados");
});

module.exports = router;
