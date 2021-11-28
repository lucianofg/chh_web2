function sessionControl(req, res, next) {
    /*
    const paginas_publicas = [
        '/',
        '/usuario/login',
        '/usuario/create',
        '/concurso'
    ]
    if ((req.session.id_usuario != undefined)
        || (req.url == '/' && req.method == 'GET')
        || (paginas_publicas.includes(req.url))
    ) next(); 
    else res.redirect('/');
    */
    next();
}

module.exports = sessionControl;
