/**
 * Entidade que vai ser usado para todos os usuários do site, incluindo
 * familiares, colaboradores e administradores
 */
const Sequelize = require('sequelize');
const schema = require('../config/sequelize_postgres')

const ModeloUsuario = {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    nome: { type: Sequelize.STRING, allowNull: false },
    sobrenome: { type: Sequelize.STRING, allowNull: false },
    senha: { type: Sequelize.STRING, allowNull: false },
    salt: { type: Sequelize.STRING, allowNull: false },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    eColaborador: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    eAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
};

const Usuario = schema.define(
    'usuario', ModeloUsuario, { underscored: true },
)

module.exports = Usuario;
