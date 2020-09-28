var express = require('express');
var excels = require('./validacion.js');
var body_parser = require('body-parser');
var multer = require('multer')
app.use(body_parser.urlencoded({ extended: true }));

storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './archivos') // Agregamos el directorio donde se guardarán los archivos.
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // Le pasamos el nombre original del archvio
    }
}),
    upload = multer({ storage }),

    app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/seleccionModulo.html');
})

app.post('/validacion_de_archivos', upload.single('archivo'), (req, res) => {
    arc = req.file.originalname
    excels.validar('Analisis', arc, `archivos/${arc}`)
    res.send('Archivo subido correctamente: ' + req.file.originalname +
        '<h1>' + `${excels.evaluacion}` + '<br>' + '<a href="http://localhost:3000/"><button>volver</button></a></h1>')
})

app.listen(3000, () => {
    console.log('El servidor esta corriendo');
})

