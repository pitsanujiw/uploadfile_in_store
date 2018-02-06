const express = require('express');
const router = express.Router();
const multer = require('multer');
const bodyParser = require("body-parser")
const fs = require("fs");
const mongoose = require('mongoose');
const path = require('path')

const filePath = mongoose.Schema({
    path: {
        type: String,
        required: true,
        trim: true
    },
    originalname: {
        type: String,
        required: true
    }

});
const DataFile = module.exports = mongoose.model('files', filePath);

router.getFiles = (callback, limit) => {

    DataFile.find(callback).limit(limit);
}

router.getFileById = (id, callback) => {

    DataFile.findById(id, callback);

}

router.addfile = (file, callback) => {
    DataFile.create(file, callback);
}



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

let upload = multer({
    storage: storage
})

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/index.html'));
});

router.post('/', upload.any(), (req, res, next) => {
    res.send(req.files);
    req.files.forEach((e, index) => {
        console.log(e);
        const path = req.files[index].path;
        const fileName = req.files[index].originalname;

        const filepath = {};
        filepath['path'] = path;
        filepath['originalname'] = fileName;
        router.addfile(filepath, (err) => {
        });
    });
});

module.exports = router;