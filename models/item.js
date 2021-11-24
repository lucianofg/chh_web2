/**
 * Entidade que vai ser usada para o cadastro de um item que vai
 * concorrer a um concurso.
 */
const Sequelize = require('sequelize');
const schema = require('../config/sequelize_postgres');
const Concurso = require('./concurso');

const ModeloItem = {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    tipo_item: {
        type: Sequelize.CHAR(1),
        allowNull: false,
    },
    link_item: {
        type: Sequelize.STRING,
        allowNull: false
    },
};

const Item = schema.define(
    'item',
    ModeloItem, { underscored: true },
);

Item.belongsTo(Concurso, { as: 'id_concurso' });

module.exports = Item;