const db = require('../config/db');

async function getListaItensView(req, res) {

}

async function getItemView(req, res) {
    res.render('item/itemView', { layout: 'main.handlebars' })
}
async function getItemCreate(req, res) {
    res.render('item/itemCreate', { layout: 'main.handlebars' })
}
async function postItemCreate(req, res) {


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

}

async function deleteItem(req, res) {


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
        vic.numero_votos += 1;
        vic.save();
        res.redirect('/')
    }).catch(err => {
        res.redirect('/')
    })
}

module.exports = {
    getListaItensView,
    getItemView,
    getItemCreate,
    postItemCreate,
    getItemEdit,
    postItemEdit,
    deleteItem,
    getListaItensComVotos,
    getVotosItemConcurso,
    postVotarItemConcurso,
};