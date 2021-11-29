/**
 * Entidade que vai ser usada para  armazenar os likes
 */
const Sequelize = require('sequelize');
const schema = require('../config/sequelize_postgres');
const Item = require('./item');
const Usuario = require('./usuario');

const ModeloGostou = {
    gostou: {
        type: Sequelize.BOOLEAN,
        default: false,
    }
};

const Gostou = schema.define(
    'gostou', ModeloGostou, { underscored: true },
);

Item.belongsToMany(Usuario, {through: 'gostou'});
Usuario.belongsToMany(Item, {through: 'gostou'});

module.exports = Gostou;
