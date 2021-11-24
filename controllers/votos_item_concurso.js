const db = require('../config/db');

async function getListaItensComVotos(req, res) {}

async function getVotosItemConcurso(req, res) {}

async function postVotarItemConcurso(req, res) {
    const id_item = req.body.id_item;
    const id_concurso = req.params.id_concurso;

    db.VotosItemConcurso.findOne({
        where: {
            id_item: id_item,
            id_concurso: id_concurso,
        }
    }).then(vic => {
        vic.numero_votos += 1;
        vic.save();
        res.redirect('/')
    }).catch(err => {
        res.redirect('/')
    })
}