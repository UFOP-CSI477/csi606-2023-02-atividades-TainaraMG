const Sequelize = require('sequelize');
const database = require('../database/client');
const Imovel = require('./imovel');

const Contrato = database.define('contratos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    imovel_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Imovel,
            key: 'id'
        }
    },
    status: {
        type: Sequelize.INTEGER
    },
    data_assinatura: {
        type: Sequelize.DATE
    },
    validade: {
        type: Sequelize.INTEGER
    },
    dia_vencimento_parcelas: {
        type: Sequelize.INTEGER
    }
});
Contrato.belongsTo(Imovel, { foreignKey: 'imovel_id' });
module.exports = Contrato;
