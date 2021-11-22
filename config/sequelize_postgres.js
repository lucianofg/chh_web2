const Sequelize = require('sequelize');

// Sequelize segue a forma:     banco      usuario     senha
const schema = new Sequelize('web2_db', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = schema;

