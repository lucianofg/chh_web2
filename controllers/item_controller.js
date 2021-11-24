const db = require('../config/db');

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