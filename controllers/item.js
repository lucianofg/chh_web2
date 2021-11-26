const db = require('../config/db');

async function getListaItensView(req, res) {

}

async function getItemView(req, res) {
    db.Item.findOne({
        where: { id: req.params.id }
    }).then(item => {
        res.render('item/itemView', { 
            layout: 'main.handlebars',
            item: item.toJSON(),
            usuario: {
                id: req.session.id_usario,
                eAdmin: req.session.eAdmin,
            },
        });
    }).catch(error => {

    });
}
async function getItemCreate(req, res) {
    res.render('item/itemCreate', { 
        layout: 'main.handlebars',
        usuario: {
            id: req.session.id_usario,
            eAdmin: req.session.eAdmin,
        },
    });
}

async function postItemCreate(req, res) {
    db.Item.create({
        id_concurso: req.body.id_concurso,
        id_usuario: req.session.id_usuario,
        numero_votos: 0,
        nome: req.body.nome,
        link_item: req.body.link_item,
    }).then(item => {

    }).catch(error => {

    });
}

async function getItemEdit(req, res) {
    await db.Item.findOne({
        where: {
            id: req.params.id_item,
            id_concurso: req.params.id_concurso,
        }
    }).then((item) => {
        res.render('item/itemEdit', {
            item: item.toJSON(),
            layout: 'noMenu.handlebars',
        });
    }).catch((err) => {
        res.render('erros/404_not_found', { layout: 'noMenu.handlebars' })
    });
}
async function postItemEdit(req, res) {
    db.Item.findOne({
        where: { id: req.body.id }
    }).then(item => {
        item.set({
            nome: req.body.nome,
            link_item: req.body.link_item,
        });
        item.save();
    }).catch(error => {
        res.json({
            error: error,
        });
    })

}

async function getItemDelete(req, res) {
    db.Item.destroy({
        where: {
            id: req.params.id,
        }
    });
}

async function getListaItensComVotos(req, res) {

}

async function getVotosItemConcurso(req, res) {

}

async function postVotarItemConcurso(req, res) {
    const id_item = req.body.id_item;
    const id_concurso = req.params.id_concurso;

    db.Item.findOne({
        where: {
            id_item: id_item,
            id_concurso: id_concurso,
        }
    }).then(vic => {
        vic.increment('numero_votos', { returning: false });
    }).catch(error => {
        res.json({
            error: error
        })
    });
}

module.exports = {
    getListaItensView,
    getItemView,
    getItemCreate,
    postItemCreate,
    getItemEdit,
    postItemEdit,
    getItemDelete,
    getListaItensComVotos,
    getVotosItemConcurso,
    postVotarItemConcurso,
};
