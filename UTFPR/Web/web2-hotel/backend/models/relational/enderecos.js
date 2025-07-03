module.exports = (sequelize, Sequelize) => {
	const Enderecos = sequelize.define('enderecos', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true, allowNull: false, primaryKey: true
		},
		cep: {
			type: Sequelize.STRING(10), allowNull: false
		},
		numero: {
			type: Sequelize.STRING, allowNull: false
		},
		complemento: {
			type: Sequelize.STRING, allowNull: false
		}
	});
	return Enderecos
		;
}
