/**
 * Entidade que vai ser usada para o cadastro dos concursos
 */
const Sequelize = require('sequelize');
const db = require('../config/sequelize_postgres')

const ModeloConcurso = {
    id: {
        type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
    },
        nome_concurso: { type: Sequelize.TEXT, allowNull: false },
        descricao: { type: Sequelize.TEXT, allowNull: false },
        premio: { type: Sequelize.TEXT, allowNull: false },
}

const Concurso = db.sequelize.define(
    'concurso',
    ModeloConcurso,
    {underscored: true},
);

module.exports = {Concurso};
