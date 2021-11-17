/**
 * Entidade que vai ser usado para todos os usuários do site, incluindo
 * familiares, colaboradores e administradores
 */
const Sequelize = require('sequelize');
const db = require('../config/sequelize_postgres')

const ModeloUsuario = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {type: Sequelize.STRING, allowNull: false},
    sobrenome: {type: Sequelize.STRING, allowNull: false},
    senha: {type: Sequelize.STRING, allowNull: false},
    salt: {type: Sequelize.STRING, allowNull: false},
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    eAtivo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    eAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
};

const Usuario = db.sequelize.define(
    'usuario',
    ModeloUsuario,
    {underscored: true},
)

module.exports = {Usuario};

