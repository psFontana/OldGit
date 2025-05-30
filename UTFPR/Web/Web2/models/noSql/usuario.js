const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  nome: { type: String, required: true },
  nascimento: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  enderecos: [{ type: Schema.Types.Number, ref: 'Endereco' }],
  restaurantes: [{ type: Schema.Types.Number, ref: 'Restaurante' }],
  perfil: { type: String, enum: ['admin', 'dono', 'cliente'], default: 'cliente' },
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
