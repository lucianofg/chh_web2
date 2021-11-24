var db = {}

db.Usuario = require('../models/usuario');
db.Concurso = require('../models/concurso');
db.Item = require('../models/item');

db.Usuario.sync()
db.Concurso.sync()
db.Item.sync()

module.exports = db;