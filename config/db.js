var db = {}

db.Usuario = require('../models/usuario');
db.Concurso = require('../models/concurso');
db.Item = require('../models/item');
db.VotosItemConcurso = require('../models/votos_item_concurso');

db.Usuario.sync()
db.Concurso.sync()
db.Item.sync()
db.VotosItemConcurso.sync()

module.exports = db;

