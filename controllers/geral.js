const {  getUsuario } = require('./utils');

async function getRoot(req, res) {
    res.render('geral/root', {
        layout: 'main.handlebars',
        usuario: getUsuario(req),
    })
}

async function getHome(req, res) {
    res.render('geral/home', {
        layout: 'main.handlebars',
        usuario: getUsuario(req),
    });
}

async function getNotFound(req, res) {
    res.render('erros/404_not_found', {layout: 'noMenu.handlebars'});
}


module.exports = {
    getRoot,
    getHome,
    getNotFound,
}
