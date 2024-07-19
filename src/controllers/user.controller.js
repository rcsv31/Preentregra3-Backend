const passport = require("passport");
const { errorMessages } = require("../services/errors/custom-error.js");
const UserDTO = require("../dto/user.dto.js");
const userRepository = require("../repositories/user.repository.js");
const UserModel = require("../models/user.model.js");
const { EmailManager } = require("../services/email.js");
const {
  generarResetToken,
  createHash,
  isValidPassword,
} = require("../utils/util.js");

// Helper function for handling passport authentication
const handlePassportAuth = (
  strategy,
  successRedirect,
  failureRedirect,
  errorMessageMapper
) => {
  return (req, res, next) => {
    passport.authenticate(strategy, (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        const errorMessage = errorMessageMapper(info) || "Error desconocido.";
        return res.status(400).json({ error: errorMessage });
      }
      res.redirect(successRedirect);
    })(req, res, next);
  };
};

// Register route
exports.register = handlePassportAuth(
  "register",
  "/login",
  "/register",
  (info) => errorMessages.userErrors[info.errorCode]
);

// Login route
exports.login = handlePassportAuth(
  "login",
  "/products",
  "/login",
  (info) => errorMessages.userErrors[info.errorCode]
);

// GitHub callback route
exports.githubCallback = handlePassportAuth(
  "github",
  "/products",
  "/login",
  (info) => errorMessages.userErrors[info.errorCode]
);

// Logout route
exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/login");
  });
};

// Get current user route
exports.getCurrentUser = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "No autorizado" });
  }
  const userDTO = new UserDTO(req.user);
  res.json(userDTO);
};

// Request password reset route
exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).send("Usuario no encontrado");

    const token = generarResetToken();
    user.resetToken = {
      token,
      expire: new Date(Date.now() + 3600000), // 1 Hora de duración
    };
    await user.save();

    await EmailManager.enviarCorreoRestablecimiento(
      email,
      user.first_name,
      token
    );
    res.redirect("/confirmacion-envio");
  } catch (error) {
    console.error(
      "Error al solicitar el restablecimiento de contraseña:",
      error
    );
    res.status(500).send("Error interno del servidor");
  }
};

// Reset password route
exports.resetPassword = async (req, res) => {
  const { email, password, token } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user)
      return res.render("passwordcambio", { error: "Usuario no encontrado" });

    const resetToken = user.resetToken;
    if (
      !resetToken ||
      resetToken.token !== token ||
      new Date() > resetToken.expire
    ) {
      return res.render("passwordreset", {
        error: "El token es inválido o ha expirado",
      });
    }

    if (isValidPassword(password, user)) {
      return res.render("passwordcambio", {
        error: "La nueva contraseña no puede ser igual a la anterior",
      });
    }

    user.password = createHash(password);
    user.resetToken = undefined;
    await user.save();

    res.redirect("/login");
  } catch (error) {
    console.error("Error al restablecer la contraseña:", error);
    res
      .status(500)
      .render("passwordreset", { error: "Error interno del servidor" });
  }
};

// Change user role route
exports.cambiarRolPremium = async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await UserModel.findById(uid);
    if (!user) return res.status(404).send("Usuario no encontrado");

    user.role = user.role === "usuario" ? "premium" : "usuario";
    const actualizado = await UserModel.findByIdAndUpdate(
      uid,
      { role: user.role },
      { new: true }
    );

    res.json(actualizado);
  } catch (error) {
    console.error("Error al cambiar el rol del usuario:", error);
    res.status(500).send("Error interno del servidor");
  }
};
