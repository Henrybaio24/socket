const mongoose = require("mongoose");

const { Schema } = mongoose;

const User = Schema({
  nombre: { type: String },
  apellido: { type: String },
  email: { type: String },
  password: { type: String },
  sessionID: { type: String },
  createAt: { type: Date },
});

module.exports = mongoose.model("User", User);
