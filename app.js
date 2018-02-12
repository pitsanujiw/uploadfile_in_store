const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const autoIncrement = require('mongoose-auto-increment')
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(bodyParser.json());
const routes = require('./routes/upload.routes');

mongoose.connect('mongodb://localhost/filepath');

app.use(routes);

app.get('/files',(req, res)=> {

    routes.getFiles((err, genres)=> {
        if (err) {
            throw err;
        }
        res.json(genres);

    });
});

app.get('/files/:id',(req, res)=> {

    routes.getFileById(req.params.id,(err, genres)=> {
        if (err) {
            throw err;
        }

        res.send(genres.path)
    });
});

const server = app.listen(8000, 'localhost',()=> {
    console.log("Example app listening at localhost:8000");

});