const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestauranteSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  nome: { type: String, required: true },
  pratos: [{
    nome: { type: String, required: true },
    descricao: String,
    preco: Number,
    comentarios: [{
      autor: String,
      texto: String,
      data: { type: Date, default: Date.now }
    }]
  }]
});

module.exports = mongoose.model("Restaurante", RestauranteSchema);