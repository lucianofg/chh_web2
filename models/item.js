/**
 * Entidade que vai ser usada para o cadastro de um item que vai
 * concorrer a um concurso.
 */
const Sequelize = require('sequelize');
const schema = require('../config/sequelize_postgres');
const Concurso = require('./concurso');
const Usuario = require('./usuario');

const ModeloItem = {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    link_item: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    numero_votos: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }
};

const Item = schema.define(
    'item', ModeloItem, {underscored: true},
);

Item.belongsTo(Concurso);
Item.belongsTo(Usuario);

module.exports = Item;
