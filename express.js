var express = require('express');
var excels = require('./validacion.js');
var bodyParser = require('body-parser');
var multer = require('multer');
const fs = require('fs')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://jhonny95:369852147@1-1.xxloa.mongodb.net/Archivosdb?retryWrites=true&w=majority";

storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './archivos')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
}),

    upload = multer({ storage }),
    app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/seleccionModulo.html');
})

app.post('/validacion_de_archivos', upload.single('archivo'), (req, res) => {
    if (req.file.originalname === undefined) {
        next(new Error('no coincide'));
    }
       MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Archivosdb");
        var myobj = { modulo: `${modulo}`, name: `${fileName}`, totalEncabezados: `${excels.celdasTotales}` };
        dbo.collection("archivos").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    }) 
    fileName = req.file.originalname
    modulo = req.body.modulo
    excels.validar(modulo, fileName, `archivos/${fileName}`);
    res.send(`<h1 style="text-align:center;margin-top:300px;font-family: Arial, Helvetica, sans-serif;"> 
                El archivo:${fileName}<br>${excels.mensajeEvaluacion} 
                <a href="http://localhost:3000/"><br>
                <button style="font-size:25px; border-radius: 10px;">INICIO</button></a>
              </h1>`

    )
<<<<<<< HEAD
    
=======
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Archivosdb");
        var myobj = { modulo: `${modulo}`, name: `${fileName}`, totalEncabezados: `${excels.celdasTotales}` };
        dbo.collection("archivos").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 documento insertado");
            db.close();
        });
    })
>>>>>>> 7f3f1fe925d4ec513c9d506f38f1ea32d3cf748d
    fs.unlink('./archivos/' + fileName, (err) => {
        if (err) {
            console.error(err)
            return
        }
    })
});

app.use(function (err, req, res, next) {
    console.log(err.stack);
    fs.unlink('./archivos/' + fileName, (err) => {
        if (err) {
            console.error(err)
            return
        }
    })
    return res.status(500).send(`<h1 style="text-align:center;margin-top:300px;font-family: Arial, Helvetica, sans-serif;">El archivo no coincide con el modulo seleccionado<a href="http://localhost:3000/"><br><br>
    <button style="font-size:25px; border-radius: 10px;">INICIO</button></a></h1>`);
});




app.listen(3000, () => {
    console.log('http://localhost:3000...');
});