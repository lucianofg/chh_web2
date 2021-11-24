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
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    tipo_item: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    link_item: {
        type: Sequelize.STRING,
        allowNull: false
    },
    numero_votos: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }
};

const Item = schema.define(
    'item', ModeloItem, { underscored: true },
);

Item.belongsTo(Concurso, { as: 'id_concurso' });

module.exports = Item;