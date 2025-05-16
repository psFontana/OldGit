module.exports = (sequelize, Sequelize) => {
  const UsuarioEndereco = sequelize.define('usuario_endereco', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true, allowNull: false, primaryKey: true
    },
    id_usuario: {
      type: Sequelize.INTEGER, allowNull: false,
      references: { model: 'usuarios', key: 'id' }
    },
    id_endereco: {
      type: Sequelize.INTEGER, allowNull: false,
      references: { model: 'enderecos', key: 'id' }
    }
  });
  return UsuarioEndereco;
}
