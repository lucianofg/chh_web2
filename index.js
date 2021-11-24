const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const express = require('express');
const path = require('path');

const routes = require('./routers/routes')

const app = express();
app.use(express.static(path.join(__dirname, 'public')));


const SECRET = '36fbf08991ab27f94e7940947d7764fee8829';
const COOKIE_MAX_AGE = 60 * 60 * 1000;

app.use(cookieParser());
app.use(session({
    secret: SECRET,
    saveUninitialized: true,
    cookie: { maxAge: COOKIE_MAX_AGE },
}));

app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(8000, function() {
    console.log("Servidor rodando no http://localhost:8081");
});