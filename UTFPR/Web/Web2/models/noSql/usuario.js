const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  nome: { type: String, required: true },
  nascimento: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  enderecos: [{ type: Schema.Types.ObjectId, ref: 'Endereco' }],
  restaurantes: [{ type: Schema.Types.ObjectId, ref: 'Restaurante' }]
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
