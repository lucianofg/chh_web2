/**
 * Entidade que vai ser usada para armazenar a votação de um item em
 * um determinado concurso
 */
const Sequelize = require('sequelize');
const db = require('../config/sequelize_postgres')
const Item = require('./item');
const Concurso = require('./concurso');

const ModeloVotosItemConcurso = {
    numero_votos: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }
}

const VotosItemConcurso = db.sequelize.define(
    'votacao',
    ModeloVotosItemConcurso,
    {underscored: true},
);

VotosItemConcurso.belongsTo(Item);
VotosItemConcurso.belongsTo(Concurso);

module.exports = {VotosItemConcurso};
