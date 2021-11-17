/**
 * Entidade que vai ser usada para o cadastro de um item que vai
 * concorrer a um concurso.
 */
const Sequelize = require('sequelize');
const db = require('../config/sequelize_postgres');

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

const Item = db.sequelize.define(
    'item',
    ModeloItem,
    {underscored: true},
);

module.exports = {Item};

