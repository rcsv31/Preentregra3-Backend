require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github").Strategy;
const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const cartService = require("../services/cart.service");
const CartModel = require("../models/cart.model.js");

// Función para hashear la contraseña
const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

// Función para comparar la contraseña hasheada
const isValidPassword = (password, user) => {
  return bcrypt.compareSync(password, user.password);
};

// Función para inicializar Passport con nuestras estrategias
const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          let user = await userModel.findOne({ email });
          if (user) {
            return done(null, false, {
              message: "El correo electrónico ya está registrado",
            });
          }

          const newCart = await cartService.createNewCart(); // Usa cartService para crear un nuevo carrito

          let newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            cart: newCart._id, // Asigna el nuevo ID del carrito al usuario
          };

          let resultado = await userModel.create(newUser);
          return done(null, resultado);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        try {
          let user = await userModel.findOne({ email });
          if (!user) {
            return done(null, false, { message: "Usuario no encontrado" });
          }
          if (!isValidPassword(password, user)) {
            return done(null, false, { message: "Contraseña incorrecta" });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/sessions/github/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile._json.email || `${profile.username}@github.com`;
          let user = await userModel.findOne({ email });
          if (!user) {
            const newCart = await cartService.createNewCart(); // Usa cartService para crear un nuevo carrito
            let newUser = {
              first_name: profile._json.name || profile.username,
              last_name: profile._json.name || profile.username,
              email: email,
              age: 18,
              cart: newCart._id,
              password: createHash("github"),
            };
            let resultado = await userModel.create(newUser);
            done(null, resultado);
          } else {
            done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await userModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

module.exports = initializePassport;
