const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PedidoSchema = new Schema({
  id: { type: Number, required: true, unique: true }, 
  id_usuario: { type: Number, required: true },
  id_restaurante: { type: Number, required: true },
  pratos: [{
    nome: { type: String, required: true },
    descricao: String,
    preco: Number,
    comentarios: [{
      autor: String,
      texto: String,
      data: { type: Date, default: Date.now }
    }]
  }],
  total: { type: Number, required: true },
  status: { type: String, required: true, enum: ['Pendente', 'Em Preparação', 'Entregue'] },
  data: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Pedido", PedidoSchema);