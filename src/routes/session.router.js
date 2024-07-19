const express = require("express");
const passport = require("passport");
const router = express.Router();

// Ruta para autenticacion con GitHub
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// Callback de GitHub despues de la autenticacion
router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: "/products",
    failureRedirect: "/login",
  })
);

//Ruta current(obtiene el usuario actual)
router.get("/current", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("profile", { user: req.user });
  } else {
    res.status(401).json({ message: "Usuario no autenticado" });
  }
});

//Ruta logout
router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

module.exports = router;
