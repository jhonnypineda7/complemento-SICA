var express = require('express');
var excels = require('./validacion.js');
var bodyParser = require('body-parser');
var multer = require('multer');

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
    fileName = req.file.originalname
    modulo = req.body.modulo
    excels.validar(modulo, fileName, `archivos/${fileName}`);
    res.send(`<h1 style="text-align:center;margin-top:300px;font-family: Arial, Helvetica, sans-serif;"> 
                El archivo:${fileName}<br>${excels.mensajeEvaluacion} 
                <a href="http://localhost:3000/"><br>
                <button style="font-size:25px; border-radius: 10px;">INICIO</button></a>
              </h1>`
    )
});

app.listen(3000, () => {
    console.log('http://localhost:3000...');
});