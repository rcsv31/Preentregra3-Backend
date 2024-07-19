const { errorMessages } = require("./errorMessages");

const handleProductError = (errorCode, res) => {
  const errorMessage =
    errorMessages.productErrors[errorCode] || "Error desconocido.";
  res.status(400).json({ error: errorMessage });
};

const handleCartError = (errorCode, res) => {
  const errorMessage =
    errorMessages.cartErrors[errorCode] || "Error desconocido.";
  res.status(400).json({ error: errorMessage });
};

const handleUserError = (errorCode, res) => {
  const errorMessage =
    errorMessages.userErrors[errorCode] || "Error desconocido.";
  res.status(400).json({ error: errorMessage });
};

const handleCommonError = (errorCode, res) => {
  const errorMessage =
    errorMessages.commonErrors[errorCode] || "Error desconocido.";
  res.status(500).json({ error: errorMessage });
};

module.exports = {
  handleProductError,
  handleCartError,
  handleUserError,
  handleCommonError,
};
