const db = require('../config/db');
const { getUsuario } = require('./utils');
const uploadsFolder = '/uploads'

async function getListaItensConcursoView(req, res) {
    const concurso = await db.Concurso.findByPk(req.params.id_concurso);
    db.Item.findAll({
        where: {
            id_concurso: req.params.id_concurso,
        },
    }).then(itens => {
        res.render('item/itemConcursoList', {
            layout: 'main.handlebars',
            itens: itens.map(i => i.toJSON()),
            concurso: concurso.toJSON(),
            usuario: getUsuario(req),
        })
    }).catch(error => {
        res.render('item/itemConcursoList', {
            layout: 'main.handlebars',
            concurso: concurso.toJSON(),
            error: error,
        });
    });
}

async function getListaItensUsuarioView(req, res) {
    const query = `SELECT 
            items.id as id, 
            items.nome as nome, 
            items.link_item as link_item, 
            concursos.nome as nome_concurso, 
            concursos.id as id_concurso, 
        FROM items INNER JOIN concursos 
            ON concursos.id = items.id_concurso;`
    db.schema.query(query).then(itens => {
        console.log(itens);
        res.render('item/itemConcursoList', {
            layout: 'main.handlebars',
            itens: itens.map(i => i.toJSON()),
            usuario: getUsuario(req),
        });
    }).catch(error => {
        console.log(error);
        res.render('item/itemConcursoList', {
            layout: 'main.handlebars',
            error: error,
        });

    });
}


async function getItemView(req, res) {
    db.Item.findOne({
        where: { id: req.params.id }
    }).then(item => {
        res.render('item/itemView', { 
            layout: 'main.handlebars',
            item: item.toJSON(),
            usuario: getUsuario(req),
        });
    }).catch(error => {
        res.render('item/itemView', {
            layout: 'main.handlebars',
            error: error,
        })
    });
}

async function getItemCreate(req, res) {
    res.render('item/itemCreate', { 
        layout: 'main.handlebars',
        usuario: getUsuario(req),
        id_concurso: req.params.id_concurso,
    });
}

async function postItemCreate(req, res) {
    db.Item.create({
        id_concurso: req.body.id_concurso,
        id_usuario: req.session.id_usuario,
        numero_votos: 0,
        nome: req.body.nome,
        link_item: uploadsFolder + req.file.filename,
    }).then(item => {
        res.render('item/itemCriado', {
            layout: 'noMenu.handlebars',
            item: item.nome,
        });
    }).catch(error => {
        res.render('item/itemCriado', {
            layout: 'main.handlebars',
            error: error,
        });
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
    if (req.session.eAdmin) {
        db.Item.destroy({
            where: {
                id: req.params.id,
            }
        });
    }
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
    getListaItensConcursoView,
    getListaItensUsuarioView,
    getItemView,
    getItemCreate,
    postItemCreate,
    getItemEdit,
    postItemEdit,
    getItemDelete,
    postVotarItemConcurso,
};
