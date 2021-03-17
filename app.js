const express = require('express');
const app = express();

// motor de plantillas
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

//dotnv invoque
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});

//directorio public
app.use('/resources',express.static('public'));
app.use('/resources',express.static(__dirname + '/public'));


//invocamos a bcryptjs
const bcryptjs = require('bcryptjs');
//var de sesion
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized:true
}));

const conexion= require('./database/db');

app.use('/',require('./router'));

app.listen(3000, ()=>{
    console.log('Server running in http://localhost:3000/')
});

