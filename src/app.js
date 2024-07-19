const express = require("express");
const session = require("express-session");
const expressHandlebars = require("express-handlebars");
const socket = require("socket.io");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const initializePassport = require("./config/passport.config.js");
const expressCompression = require("express-compression");

const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

const { puerto, session_secret, mongo_url } = require("./config/config.js");
require("./database.js");

const { addLogger, logger } = require("./utils/logger.js");
// Conexión a MongoDB con Mongoose
mongoose
  .connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Conectado a MongoDB");
  })
  .catch((err) => {
    logger.error("Error al conectar a MongoDB:", err);
  });

// Crear una aplicación Express
const app = express();

// Middleware
app.use(express.static("./src/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  expressCompression({
    brotli: {
      enabled: true,
      zlib: {},
    },
  })
);

// Configuración de express-session con Mongoose y connect-mongo
const sessionStore = MongoStore.create({
  mongoUrl: mongo_url,
  collectionName: "sessions",
  ttl: 1 * 24 * 60 * 60, // Tiempo de vida de la sesión en segundos (1 día)
  autoRemove: "native", // Limpieza automática de sesiones expiradas
});

app.use(
  session({
    secret: session_secret,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Asegura las cookies en producción (HTTPS)
      maxAge: 1 * 24 * 60 * 60 * 1000, // Tiempo de vida de la cookie en milisegundos (1 día)
    },
  })
);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
initializePassport();

// Configuración de handlebars
const hbs = expressHandlebars.create({
  defaultLayout: "main",
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Importar middleware
//const { addLogger } = require("./utils/logger.js");

// Usar el middleware antes de las rutas
app.use(addLogger);

// Rutas
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");
const userRouter = require("./routes/user.router.js");
const sessionRouter = require("./routes/session.router.js");
const mockingProductsRouter = require("./routes/mockingproducts.router.js");
const loggertestRouter = require("./routes/loggertest.js");

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", userRouter);
app.use("/api/sessions", sessionRouter);
app.use("/mockingproducts", mockingProductsRouter);
app.use("/loggertest", loggertestRouter);

// Iniciar el servidor y escuchar en el puerto
const server = app.listen(puerto, () => {
  logger.info(`Esta aplicación funciona en el puerto ${puerto}`);
});

// Configurar socket.io
const io = socket(server);

// Manejo de eventos de chat
io.on("connection", (socket) => {
  logger.info("Nuevo usuario conectado");

  socket.on("message", async (data) => {
    await MessageModel.create(data);
    const messages = await MessageModel.find();
    io.sockets.emit("message", messages);
  });
});
