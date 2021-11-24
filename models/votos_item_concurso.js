/**
 * Entidade que vai ser usada para armazenar a votação de um item em
 * um determinado concurso
 */
const Sequelize = require('sequelize');
const schema = require('../config/sequelize_postgres')
const Item = require('./item');
const Concurso = require('./concurso');

const ModeloVotosItemConcurso = {
    numero_votos: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }
}

const VotosItemConcurso = schema.define(
    'votacao', ModeloVotosItemConcurso, { underscored: true },
);

Item.belongsToMany(Concurso, { through: VotosItemConcurso, as: 'id_item' });
Concurso.belongsToMany(Item, { through: VotosItemConcurso, as: 'id_concurso' });

module.exports = VotosItemConcurso;