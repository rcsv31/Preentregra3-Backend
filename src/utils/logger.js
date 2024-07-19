const winston = require("winston");

//const logger = winston.createLogger({
//  transports: [
//    new winston.transports.Console({ level: "http" }),
//    new winston.transports.File({
//      filename: "./errors.log",
//      level: "warn",
//    }),
//  ],
//});
//
//Niveles personalizados
const niveles = {
  nivel: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colores: {
    fatal: "red",
    error: "yellow",
    warning: "cyan",
    info: "green",
    http: "magenta",
    debug: "white",
  },
};

const logger = winston.createLogger({
  levels: niveles.nivel,
  transports: [
    ...(process.env.NODE_ENV === "production"
      ? [
          new winston.transports.File({
            filename: "./errors.log",
            level: "info",
            format: winston.format.simple(),
          }),
        ]
      : [
          new winston.transports.Console({
            level: "debug",
            format: winston.format.combine(
              winston.format.colorize(),
              winston.format.simple()
            ),
          }),
        ]),
  ],
});

//const logger = winston.createLogger({
//  levels: niveles.nivel,
//  transports: [
//    new winston.transports.Console({
//      level: "http",
//      format: winston.format.combine(
//        winston.format.colorize({ colors: niveles.colores }),
//        winston.format.simple()
//      ),
//    }),
//    new winston.transports.File({
//      filename: "./errors.log",
//      level: "warning",
//      format: winston.format.simple(),
//    }),
//  ],
//});

// Middleware
const addLogger = (req, res, next) => {
  req.logger = logger;
  req.logger.http(
    `${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`
  );
  next();
};

module.exports = { addLogger, logger };
