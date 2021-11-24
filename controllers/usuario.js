const db = require('../config/db');
const argon = require('argon2'); // função de hash
const crypto = require('crypto');
const TAMANHO_SALT = 64;

function gerarSalt() {
    return crypto.randomBytes(Math.ceil(TAMANHO_SALT / 2))
        .toString('hex')
        .slice(0, TAMANHO_SALT);
}

function verificarHash(hash, senha, salt) {
    return argon.verify(hash, senha + salt);
}

async function hashSenha(senha, salt) {
    return argon.hash(senha + salt)
}

async function getUsuarioCreate(req, res) {
    res.render('usuario/usuarioCreate', { layout: 'noMenu.handlebars' })
}

async function postUsuarioCreate(req, res) {
    const usuario = req.body;

    const novoSalt = gerarSalt();
    const novoHash = await hashSenha(usuario.senha, novoSalt);

    db.Usuario.create({
        nome: usuario.nome,
        sobrenome: usuario.sobrenome,
        senha: novoHash,
        salt: novoSalt,
        email: usuario.email,
        eAtivo: usuario.eAtivo,
        eAdmin: usuario.eAdmin,
    }).then((item) => {
        res.json({
            "Message": "Usuario criado",
            "Usuario": usuario.nome,
        });
    }).catch((error) => {
        res.json({
            "Message": "Erro na criação do usuário",
            "Erro": error,
        })
    });
}

async function getUsuarioEdit(req, res) {

}

async function postUsuarioEdit(req, res) {

}

async function deleteUsuario(req, res) {

}

async function postUsuarioDisable(req, res) {

}

async function postUsuarioLogin(req, res) {
    const email = req.body.email;
    const senha = req.body.senha;
    db.Usuario.findOne({
        where: { email: email }
    }).then(usuario => {
        if (verificarHash(usuario.senha, senha, usuario.salt)) {
            req.session.email = user.email;
            res.redirect('/home')
        } else {
            // TODO talvez refazer essa parte
            res.redirect('/');
        }
    }).catch(error => {
        res.redirect('/');
    });
}

async function postUsuarioLogout(req, res) {
    req.session.destroy();
    res.redirect('/');
}


module.exports = {
    getUsuarioCreate,
    postUsuarioCreate,
    getUsuarioEdit, //TODO
    postUsuarioEdit, // TODO
    deleteUsuario, //TODO
    postUsuarioDisable, //TODO
    postUsuarioLogin,
    postUsuarioLogout,
}