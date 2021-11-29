const db = require('../config/db');
const argon = require('argon2'); // função de hash
const { getUsuario, gerarSalt } = require('./utils');

async function getUsuarioCreate(req, res) {
    res.render('usuario/usuarioCreate', { layout: 'noMenu.handlebars' })
}

async function postUsuarioCreate(req, res) {
    const novoSalt = gerarSalt();
    const novoHash = await argon.hash(req.body.senha + novoSalt);

    db.Usuario.create({
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        senha: novoHash,
        salt: novoSalt,
        email: req.body.email,
        eAtivo: req.body.eAtivo,
        eAdmin: req.body.eAdmin,
    }).then((usuario) => {
        res.render('usuario/usuarioCriado', {
            layout: 'noMenu.handlebars',
            usuario: usuario.nome,
        })
    }).catch((error) => {
        res.render('usuario/usuarioCriado', {
            layout: 'noMenu.handlebars',
            error: error,
        })
    });
}

async function getUsuarioEdit(req, res) {
    await db.Usuario.findOne({
        where: {
            id: req.params.id
        }
    }).then((usuario) => {
        res.render('usuario/usuarioEdit', { usuario: usuario.toJSON() });
    }).catch(error => {
        res.render('erros/usuarioNaoAchado', {
            layout: 'noMenu.handlebars',
            error: error
        });
    });
}

async function getUsuarioSelfEdit(req, res) {
    await db.Usuario.findOne({
        where: {
            id: req.session.usuario_id,
        }
    }).then((usuario) => {
        res.render('usuario/usuarioEdit', {
            usuario: usuario.toJSON(),
            layout: 'noMenu.handlebars'
        });
    }).catch(err => {
        res.render('erros/usuarioNaoAchado');
    });
}

async function postUsuarioEdit(req, res) {
    const eAdmin = req.body.eAdmin ? true : false;
    const eColaborador = req.body.eColaborador ? true : false;

    db.Usuario.findOne({
        where: { id: req.body.id }
    }).then(usuario => {
        usuario.set({
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            email: req.body.email,
            eAdmin: eAdmin,
            eColaborador: eColaborador,
        });
        usuario.save();
        res.render('usuario/usuarioEditado', {
            layout: 'noMenu.handlebars',
            nomeEditado: usuario.nome,
            usuario: getUsuario(req),
        });
    }).catch(error => {
        res.json({
            error: error,
        });
    });

    res.redirect('/home');
}

async function getUsuarioDelete(req, res) {
    if (req.session.eAdmin) {
        db.Usuario.destroy({
            where: {
                id: req.params.id,
            }
        });
        res.render('usuario/usuarioDeletado', {
            layout: 'noMenu.handlebars',
            id: req.params.id,
        });
    }
}

async function getUsuarioLogin(req, res) {
    res.render('usuario/usuarioLogin', { layout: 'noMenu.handlebars' });
}

async function postUsuarioLogin(req, res) {
    const email = req.body.email;
    const senha = req.body.senha;
    db.Usuario.findOne({
        where: { email: email }
    }).then(usuario => {
        if (usuario) {
            argon.verify(usuario.senha, senha + usuario.salt).then(deu_certo => {
                if (deu_certo) {
                    req.session.usuario_id = usuario.id;
                    req.session.nome = usuario.nome;
                    req.session.eAdmin = usuario.eAdmin;
                    res.redirect('/home')
                } else {
                    throw new Error("Senha inválida")
                }
            });
        } else {
            throw new Error("E-mail não cadastrado.")
        }
    }).catch(error => {
        res.render('erros/usuarioNaoAchado', { error: error })
    });
}

async function getUsuarioLogout(req, res) {
    req.session.destroy();
    res.redirect('/');
}

async function getUsuarioList(req, res) {
    db.Usuario.findAll().then(usuarios => {
        res.render('usuario/usuarioList', {
            usuario: getUsuario(req),
            listaUsuarios: usuarios.map(u => u.toJSON()),
            layout: 'main.handlebars'
        });
    }).catch(error => {
        res.render('usuario/usuarioList', {
            error: error,
            usuario: getUsuario(req),
            layout: 'main.handlebars',
        });
    });
}

module.exports = {
    getUsuarioCreate,
    postUsuarioCreate,
    getUsuarioEdit,
    getUsuarioSelfEdit,
    postUsuarioEdit,
    getUsuarioDelete,
    getUsuarioLogin,
    postUsuarioLogin,
    getUsuarioLogout,
    getUsuarioList,
}