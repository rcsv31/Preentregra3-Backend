const errorMessages = {
  // 1. Errores al crear productos
  productErrors: {
    1: "Faltan campos obligatorios para crear el producto.",
    2: "El precio del producto debe ser un número válido.",
    3: "El stock del producto debe ser un número entero válido.",
  },
  // 2. Errores al agregar productos al carrito
  cartErrors: {
    1: "El producto que intentas agregar no se encontró.",
    2: "La cantidad del producto debe ser un número entero mayor que cero.",
  },
  // 3. Errores al crear usuarios
  userErrors: {
    1: "El nombre de usuario es obligatorio.",
    2: "El correo electrónico no es válido.",
    3: "La contraseña debe tener al menos 6 caracteres.",
  },
  // 4. Otros errores comunes
  commonErrors: {
    1: "Ha ocurrido un error interno. Por favor, inténtalo de nuevo más tarde.",
  },
};

module.exports = { errorMessages };
