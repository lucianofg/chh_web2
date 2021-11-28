function logRegister(req, res, next) {
    console.log(`${new Date().toLocaleString()}\t${req.method}\t${req.url}`);
    next();
}

module.exports = logRegister
