const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Definición del esquema del Ticket
const ticketSchema = new Schema({
  code: { type: String, required: true, unique: true },
  purchase_datetime: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true },
});

// Crear el modelo Ticket basado en el esquema definido
const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
