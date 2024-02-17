const Sequelize = require('sequelize');
const database = require('../database/client');

const Imovel = database.define('imoveis', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    tipo: {
        type: Sequelize.INTEGER
    },
    nome: {
        type: Sequelize.STRING
    },
    localizacao: {
        type: Sequelize.STRING
    },
    preco_venda: {
        type: Sequelize.DECIMAL
    },
    preco_aluguel: {
        type: Sequelize.DECIMAL
    },
    status: {
        type: Sequelize.INTEGER
    },
    outros_detalhes: {
        type: Sequelize.TEXT
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
});

module.exports = Imovel;
