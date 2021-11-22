function logRegister(req, res, next) {
    console.log(req.url + "\t" + req.method + "\t" + new Date());
    next();
}

module.exports = logRegister