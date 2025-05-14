const express = require('express');
const app = express();
const database = require('./pkg/db/index');

const akademijaController = require('./controller/akademijaController');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine' , 'ejs');
app.use(express.static('public'));

database.init();

app.get('/api/v1/akademija', akademijaController.getAllAkademija);
app.get('/api/v1/akademija/:id', akademijaController.getAkademijaById);
app.post('/api/v1/akademija',akademijaController.createAkademija);
app.patch('/api/v1/akademija/:id', akademijaController.updateAkademija);
app.delete('/api/v1/akademija/:id', akademijaController.deleteAkademija);



app.listen(process.env.PORT, (err) => {
    if(err) {
        return console.log('Could not start service');
    }
    console.log(`Service started successfully on port ${process.env.PORT}`);
});
