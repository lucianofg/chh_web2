const db = require('../config/db');
const argon = require('argon2'); // função de hash
const crypto = require('crypto');
const TAMANHO_SALT = 64;

function gerarSalt() {
    return crypto.randomBytes(Math.ceil(TAMANHO_SALT / 2))
        .toString('hex')
        .slice(0, TAMANHO_SALT);
}

async function verificarHash(hash, senha, salt) {
    console.log(hash, senha, salt)
    return ;
}

async function hashSenha(senha, salt) {
    return argon.hash(senha + salt)
}

async function getUsuarioCreate(req, res) {
    res.render('usuario/usuarioCreate', { layout: 'noMenu.handlebars' })
}

async function postUsuarioCreate(req, res) {
    const novoSalt = gerarSalt();
    const novoHash = await hashSenha(req.body.senha, novoSalt);

    db.Usuario.create({
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        senha: novoHash,
        salt: novoSalt,
        email: req.body.email,
        eAtivo: req.body.eAtivo,
        eAdmin: req.body.eAdmin,
    }).then((usuario) => {
        res.render('usuario/usuarioCriadoComSucesso', {
            layout: 'noMenu.handlebars',
            usuario: usuario.nome,
        })
    }).catch((error) => {
        res.render('usuario/usuarioCriadoComSucesso', {
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
    }).catch(err => {
        res.render('erros/usuarioNaoAchado');
    });
}

async function getUsuarioSelfEdit(req, res) {
    await db.Usuario.findOne({
        where: {
            id: req.session.id,
        }
    }).then((usuario) => {
        res.render('usuario/usuarioEdit', { usuario: usuario.toJSON() });
    }).catch(err => {
        res.render('erros/usuarioNaoAchado');
    });
}

async function postUsuarioEdit(req, res) {
    const novoSalt = gerarSalt();
    const novoHash = await hashSenha(req.body.senha, novoSalt);

    db.Usuario.findOne({
        where: { id: req.body.id }
    }).then(usuario => {
        usuario.set({
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            senha: novoHash,
            salt: novoSalt,
            email: req.body.email,
            eAtivo: req.body.eAtivo,
            eColaborador: req.body.eColaborador,
        });
        usuario.save();
    }).catch(error => {
        res.json({
            error: error,
        });
    });

    res.redirect('/home');
}

async function getUsuarioDelete(req, res) {
    db.Usuario.destroy({
        where: {
            id: req.params.id,
        }
    });
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
        console.log(senha + email);
        console.log(usuario);
        argon.verify(usuario.senha, senha + usuario.salt)
            .then(deu_certo => {
                if (deu_certo) {
                    req.session.id_usuario = usuario.id;
                    req.session.nome = usuario.nome;
                    req.session.eAdmin = usuario.eAdmin;
                    res.redirect('/home')
                } else {
                    res.render('erros/usuarioNaoAchado')
                }
            });
    }).catch(error => {
        res.render('erros/usuarioNaoAchado', {error: error})
    });
}

async function getUsuarioLogout(req, res) {
    req.session.destroy();
    res.redirect('/');
}

async function getUsuarioList(req, res) {
    res.json({
        msg: "Em construção"
    })
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
