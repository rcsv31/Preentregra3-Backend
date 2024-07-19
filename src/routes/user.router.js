const express = require("express");
const passport = require("passport");
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post(
  "/register",
  passport.authenticate("register", {
    successRedirect: "/login",
    failureRedirect: "/register",
  })
);

// Ruta para iniciar sesión con estrategia Local
router.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/products",
    failureRedirect: "/login",
  })
);

// Ruta para autenticación con GitHub
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// Callback de GitHub después de la autenticación
router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: "/products",
    failureRedirect: "/login",
  })
);

// Ruta para cerrar sesión
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

module.exports = router;
