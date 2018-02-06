const express = require('express');
const router = express.Router();
const multer = require('multer');
const bodyParser = require("body-parser")
const fs = require("fs");
const mongoose = require('mongoose');

//path and originalname are the fields stored in mongoDB
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

// var ImageData = module.exports = mongoose.model('ImageData', imagedata);
const DataFile = module.exports = mongoose.model('files', filePath);

router.getFiles = function (callback, limit) {

    DataFile.find(callback).limit(limit);
}


router.getFileById = function (id, callback) {

    DataFile.findById(id, callback);

}

router.addfile = function (file, callback) {
    DataFile.create(file, callback);
}



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_"+Date.now()+"_" + file.originalname);
    }
});

let upload = multer({
    storage: storage  
})

router.get("/", (req, res) => {
    res.sendFile(__dirname+'/index.html');
});

    // router.post('/',(req,res)=>{
    //     upload((req,res) => {

    //         const path = req.files[0].path;
    //              const fileName = req.files[0].originalname;
    //              const filepath = {};
    //             filepath['path'] = path;
    //             filepath['originalname'] = fileName;
            
            
    //             router.addfile(filepath, function (err) {
            
    //           });
    //     })
    // })

router.post('/', upload.any(), function (req, res, next) {
    res.end("File uploaded sucessfully!.");
    // res.send(req.files);

    const path = req.files[0].path;
    const fileName = req.files[0].originalname;

    const filepath = {};
    filepath['path'] = path;
    filepath['originalname'] = fileName;


    router.addfile(filepath, function (err) {

    });

});


module.exports = router;