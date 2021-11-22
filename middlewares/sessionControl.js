
function sessionControl(req, res, next) {
    if ((req.session.login != undefined)
        || (req.url == '/' && req.method == 'GET')
        || (req.url == '/login' && req.method == 'POST')
        || ((req.url).split('/')[1] == 'recuperarSenha')
    ) next(); 
    else res.redirect('/');
}

module.exports = sessionControl;
