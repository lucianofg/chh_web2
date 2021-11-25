async function getRoot(req, res) {
    res.render('geral/root', { layout: 'main.handlebars' })
}

async function getHome(req, res) {
    res.render('geral/home', { layout: 'main.handlebars' })
}

async function getAdmin(req, res) {
    res.render('geral/admin', { layout: 'main.handlebars' })
}


module.exports = {
    getRoot,
    getHome,
    getAdmin,
}