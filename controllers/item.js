const { QueryTypes } = require('sequelize');
const db = require('../config/db');
const { getUsuario } = require('./utils');
const uploadsFolder = '/uploads'

async function getListaItensConcursoView(req, res) {
    const concurso = await db.Concurso.findByPk(req.params.concurso_id);
    db.Item.findAll({
        where: {
            concurso_id: req.params.concurso_id,
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
            concursos.id as concurso_id 
        FROM items INNER JOIN concursos 
            ON concursos.id = items.concurso_id;`
    const itens = await db.schema.query(query, {
        type: QueryTypes.SELECT,
    })
    console.log(itens);
    res.render('item/itemUsuarioList', {
        layout: 'main.handlebars',
        itens: itens,
        usuario: getUsuario(req),
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
        concurso_id: req.params.concurso_id,
    });
}

async function postItemCreate(req, res) {
    db.Item.create({
        concursoId: req.body.concurso_id,
        usuarioId: req.session.usuario_id,
        numero_votos: 0,
        nome: req.body.nome,
        link_item: uploadsFolder + '/' + req.file.filename,
    }).then(item => {
        res.render('item/itemCriado', {
            layout: 'noMenu.handlebars',
            item: item.nome,
            concurso_id: req.body.concurso_id,
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
            concurso_id: req.params.concurso_id,
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
        res.render('item/itemEditado', {
            layout: 'noMenu.handlebars',
            nomeEditado: req.body.nome,
        })
    }).catch(error => {
        res.render('item/itemEditado', {
            layout: 'noMenu.handlebars',
            error: error,
        });
    })

}

async function getItemDelete(req, res) {
    db.Item.findByPk(req.params.id).then(item => {
        console.log(item);
        if (req.session.eAdmin || item.usuarioId == req.session.id_usuario) {
            item.destroy().then(item => {
                res.render('item/itemDeletado', {
                    layout: 'noMenu.handlebars',
                    id: req.params.id,
                    eAdmin: req.session.eAdmin,
                });
            });
        }
    }).catch(error => {
        res.render('item/itemDeletado', {
            layout: 'noMenu.handlebars',
            error: error,
        })
    })
}

async function postVotarItemConcurso(req, res) {
    const id_item = req.body.id_item;

    db.Item.findOne({
        where: {
            id_item: id_item,
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
