const Express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const app = Express();
app.use(bodyParser.json());
const test = require('./routes/index.route')

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./upload_file");
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

let upload = multer({
    storage: Storage
}).array("upload_files", 3); 

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/api/Upload", (req, res) => {

    upload(req, res, (err) => {
        if (err) {
            return res.end("Something went wrong!");
        }
        return res.end("File uploaded sucessfully!.");
    });
});

const server = app.listen(2000,()=> {
    const port = server.address().port
    console.log("Listening to port : "+port);
});

