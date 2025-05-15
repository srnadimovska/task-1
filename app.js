const express = require('express');
const app = express();
const database = require('./pkg/db/index');
const jwt = require('express-jwt');
const cookieParser = require('cookie-parser');

const akademijaController = require('./controller/akademijaController');
const kursController = require('./controller/kursController');
const viewController = require('./controller/viewController');
const auth = require('./controller/authController');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.set('view engine' , 'ejs');
app.use(express.static('public'));

database.init();

app.post('/api/v1/signup', auth.signup);
app.post('/api/v1/login', auth.login);

app.use(
  jwt
    .expressjwt({
      algorithms: ['HS256'],
      secret: process.env.JWT_SECRET,
      getToken: (req) => {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
          return req.headers.authorization.split(' ')[1];
        }
        if (req.cookies.jwt) {
          return req.cookies.jwt;
        }
        return null;
      },
    })
    .unless({
      path: ['/api/v1/signup', '/api/v1/login', '/kurs', '/login','/akademija','/test'],
    })
);

app.get('/api/v1/akademija', akademijaController.getAllAkademija);
app.get('/api/v1/akademija/:id', akademijaController.getAkademijaById);
app.post('/api/v1/akademija',akademijaController.createAkademija);
app.patch('/api/v1/akademija/:id', akademijaController.updateAkademija);
app.delete('/api/v1/akademija/:id', akademijaController.deleteAkademija);

app.get('/api/v1/kurs', kursController.getAllKurs);
app.get('/api/v1/kurs/:id', kursController.getKurs);
app.post('/api/v1/kurs',auth.protect,kursController.createKurs);
app.patch('/api/v1/kurs/:id', auth.protect,kursController.updateKurs);
app.delete('/api/v1/kurs/:id',auth.protect,kursController.deleteKurs);

app.get('/welcome', viewController.viewKursevi);
app.get('/test', viewController.viewTest);
app.get('/login', viewController.getLoginForm);


app.listen(process.env.PORT, (err) => {
    if(err) {
        return console.log('Could not start service');
    }
    console.log(`Service started successfully on port ${process.env.PORT}`);
});
