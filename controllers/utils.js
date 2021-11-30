const crypto = require('crypto');
const TAMANHO_SALT = 64;

function gerarSalt() {
    return crypto.randomBytes(Math.ceil(TAMANHO_SALT / 2))
        .toString('hex')
        .slice(0, TAMANHO_SALT);
}

function getUsuario(req) {
    return {
        id: req.session.usuario_id,
        nome: req.session.nome,
        eAdmin: req.session.eAdmin,
    }
}

module.exports = {
    gerarSalt,
    getUsuario,
}
